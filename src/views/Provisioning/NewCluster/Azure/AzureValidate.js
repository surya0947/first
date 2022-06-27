import {getGlobal} from "reactn";
import {GetInfraReceiver, GetReceiver} from "../common/common";

export const AzureValidateAndOpenPopup = (data, serverConfig, inputData, cloudType, beConfig) => {
  let env = JSON.parse(data.ClusterDetails.env)
  let selectedSubscription
  serverConfig.subscriptions.forEach(function (item, index) {
    if (item.fullName === env.fullName) {
      selectedSubscription = item
    }
  });

  let selectedRegion
  serverConfig.regions.forEach(function (item, index) {
    if (item.shortName === data.ClusterDetails.region) {
      selectedRegion = item
    }
  });

  let selectedRegionEnv
  selectedSubscription && selectedRegion && selectedRegion.envs && selectedRegion.envs.forEach(function (item, index) {
    if (item.name === selectedSubscription.fullName) {
      selectedRegionEnv = item
    }
  });

  let blueprint
  serverConfig.blueprintList.forEach(function (item, index) {
    if (item.requestId === data.ClusterDetails.blueprint) {
      blueprint = item
    }
  });

  var selectedBusinessEntityOwner
  serverConfig.businessEntityOwner.forEach(function (item, index) {
    if (item.name === blueprint.businessEntityOwner) {
      selectedBusinessEntityOwner = item
    }
  });

  let selectedRegionEnvBe
  selectedRegionEnv && selectedRegionEnv.be.forEach(function (item, index) {
    if (item.name === selectedBusinessEntityOwner.name) {
      selectedRegionEnvBe = item
    }
  });

  // var selectedBEEnv
  // selectedBusinessEntityOwner.envs && selectedBusinessEntityOwner.envs.forEach(function (item, index) {
  //   if (item.envName === selectedSubscription.name) {
  //     selectedBEEnv = item
  //   }
  // });

  //vNetSubnetId: `/subscriptions/${selectedEnv.subscriptionID}/resourceGroups/OPSINSIGHT-STAGING-EXT-USW-VNET-USWEST2/providers/Microsoft.Network/virtualNetworks/OPSINSIGHT-STAGING-EXT-USW-VNET/subnets/OPSINSIGHT-STAGING-EXT-USW-VNET-AKS`
  let clusterMame = blueprint.businessEntityOwner + "-" + data.ClusterDetails.name + "-" + cloudType[1] + "-" + data.ClusterDetails.envText + "-" + data.ClusterDetails.region
  let tfStateResourceGroupName = `INFRATSTRUCTURE-${data.ClusterDetails.envText}-${data.ClusterDetails.region}-AKS-CLUSTER-TFSTATE-RG`
  tfStateResourceGroupName = tfStateResourceGroupName.toUpperCase()

  inputData.cluster = {
    type: "aks",
    cloud: "azure",
    name: clusterMame,
    region: selectedRegion.name,
    dirName: selectedRegion.dirName,
    environment: selectedSubscription.env,
    account: selectedSubscription.name,
    tenantId: selectedSubscription.tenantID,
    subscription: selectedSubscription.subscriptionID,
    resourceGroupName: data.ClusterDetails.clusterResourceGroup,
    addressPrefix: data.WorkerDetails.addressPrefix,
    serviceCidr: selectedRegionEnv.serviceCidr,
    dockerBridgeCidr: selectedRegionEnv.dockerBridgeCidr,
    dnsServiceIp: selectedRegionEnv.dnsServiceIp,
    vmSize: data.WorkerDetails.instanceType,

    agentCount: parseInt(data.WorkerDetails.agentCount),
    minSize: parseInt(data.WorkerDetails.minSize),
    maxSize: parseInt(data.WorkerDetails.maxSize),
    sshPubKey: selectedRegionEnv.sshPubKey,
    eksAdminAadGroup: selectedRegionEnv.eksAdminAadGroup,
    ctopsAadGroup: selectedRegionEnv.ctopsAadGroup,
    spinnakerAadGroup: selectedRegionEnv.spinnakerAadGroup,
    dnsPrefix: clusterMame,
    version: data.ClusterDetails.k8sVersion,
    businessEntityOwner: blueprint.businessEntityOwner,
    businessUnitOwner: blueprint.businessUnitOwner,
  }
  inputData.cluster.vNetSubnetId = `/subscriptions/${selectedSubscription.subscriptionID}/resourceGroups/${data.WorkerDetails.resourceGroup}/providers/Microsoft.Network/virtualNetworks/${data.WorkerDetails.virtualNetwork}/subnets/${data.WorkerDetails.subnets}`
  inputData.cluster.storage = {
    accountName: selectedRegionEnv.storage.accountName,
    tfStateResourceGroupName: tfStateResourceGroupName
  }
  inputData.cluster.logs = {
    logAnalyticsWorkspaceName: selectedRegionEnv.logs.logAnalyticsWorkspaceName,
    logAnalyticsWorkspaceLocation: selectedRegionEnv.logs.logAnalyticsWorkspaceLocation,
    logAnalyticsWorkspaceSku: selectedRegionEnv.logs.logAnalyticsWorkspaceSku
  }

  inputData.cluster.labels = {
    "kubernetes-version": "1.12",
  }

  let user = getGlobal()
  inputData.createdBy = user.user.email

  let namespaces = []
  if (data.ClusterDetails.namespaces) {
    namespaces = data.ClusterDetails.namespaces.split(",")
  } else {
    namespaces = []
  }


  if (namespaces.length === 0) {
    inputData.cluster.blueprint = {
      name: blueprint.businessEntityOwner,
    }
  } else {
    inputData.cluster.blueprint = {
      name: blueprint.businessEntityOwner,
      configs: [{
        be: blueprint.businessEntityOwner,
        bu: blueprint.businessUnitOwner,
        namespace: namespaces,
      }]
    }
    if (blueprint.userMsiObjectId !== "") {
      inputData.cluster.blueprint.configs[0].userMsiObjectId = blueprint.userMsiObjectId
    }
    if (blueprint.groupMsiObjectId !== "") {
      inputData.cluster.blueprint.configs[0].groupMsiObjectId = blueprint.groupMsiObjectId
    }
    if (blueprint.groupMsiName !== "") {
      inputData.cluster.blueprint.configs[0].groupMsiName = blueprint.groupMsiName
    }
    if (blueprint.userMsiName !== "") {
      inputData.cluster.blueprint.configs[0].userMsiName = blueprint.userMsiName
    }
  }

  if (beConfig && beConfig.length > 0) {
    if (!inputData.cluster.blueprint.configs) {
      inputData.cluster.blueprint.configs = [...beConfig]
    } else {
      inputData.cluster.blueprint.configs = [...inputData.cluster.blueprint.configs, ...beConfig]
    }
  }


  //---------DNSCONFIG-----------
  inputData.dnsConfig = {
    clusterFqdn: selectedRegionEnvBe.clusterFqdn.replaceAll("%s", data.ClusterDetails.name),
  }

  //Foundations
  blueprint.foundation && Object.keys(blueprint.foundation).forEach(function (item, i) {
    if (blueprint.foundation[item] !== "") {
      if (item === "thanossidecar") {
        inputData.foundation["monitoringaddon"]["thanossidecar"].version = blueprint.foundation[item]
      } else {
        inputData.foundation[item].version = blueprint.foundation[item]
      }
    }
  });

  if (inputData.foundation["external-dns"]) {
    inputData.foundation["external-dns"].domainFilters = selectedSubscription.domainFilters
    inputData.foundation["external-dns"].dnsResourceGroupName = selectedSubscription.dnsResourceGroupName
    inputData.foundation["external-dns"].aadPodIdBinding = selectedSubscription.aadPodIdBinding

    let found = false
    selectedSubscription.be.forEach(function (item, i) {
      if (item.name === blueprint.businessEntityOwner) {
        found = true
        inputData.foundation["external-dns"].resourceID = item.resourceID
        inputData.foundation["external-dns"].clientID = item.clientID
      }
    });
    if (found === false) {
      let message = "Foundation external-dns error. Selected subscription do not have Managed Identity for selected bluepring (BE)"
      alert(message)
      return message
    }
  }

  if (inputData.foundation.monitoringaddon) {
    inputData.foundation.monitoringaddon.infra_receiver = GetInfraReceiver(inputData.cluster.environment, inputData.cluster.name)
    inputData.foundation.monitoringaddon.default_receiver = GetReceiver(inputData.cluster.environment, inputData.cluster.name)
    inputData.foundation.monitoringaddon.thanos_bucket = selectedRegionEnv.thanos_bucket
    inputData.foundation.monitoringaddon.smtp_smarthost = selectedRegionEnv.smtp_smarthost
  }

  if (inputData.foundation["vault-injector"]) {
    inputData.foundation["vault-injector"].vaultAddress = selectedRegionEnv.vaultAddress
    inputData.foundation["vault-injector"].azureVaultMsi = selectedRegionEnv.azureVaultMsi
  }
}
