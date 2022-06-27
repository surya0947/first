import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSpinner
} from '@coreui/react'

//import {useHistory} from "react-router-dom";

import AwsClusterDetails from "./AwsClusterDetails";
import AwsWorkerDetails from "./AwsWorkerDetails";
import Rjv from 'react-json-tree-viewer'
import * as common from "../common/common";
import {getGlobal} from "reactn";

const defaultValues = {
  clusterName: [],
  foundation: [],
  config: {},
  regionSelectOptions: [],
  env: "",
  blueprint: {
    name: "",
    configs: [{
      be: "",
      bu: "",
      namespace: []
    }]
  },
  clouds: {
    name: '',
    regions: []
  }
};

const AwsNewCluster = (props) => {
 // let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [webConfig, setWebConfig] = useState({
    "k8sVersions": [
      "1.17",
      "1.18",
      "1.19",
      "1.20",
      "1.21"
    ],
    "dnsConfigEmail": "test@abc.com",
    "awsIamRole": "EKSWorkerRole",
    "instanceType": [
      "t3.medium",
      "t3.2xlarge",
      "t3.large",
      "t3.micro",
      "t3.nano",
      "t3.small",
      "t3.xlarge",
      "t3a.2xlarge",
      "t3a.large",
      "t3a.medium",
      "t3a.micro",
      "t3a.nano",
      "t3a.small",
      "t3a.xlarge",
      "c3.2xlarge",
      "c3.4xlarge",
      "c3.8xlarge",
      "c3.large",
      "c3.xlarge",
      "c4.2xlarge",
      "c4.4xlarge",
      "c4.8xlarge",
      "c4.large",
      "c4.xlarge",
      "c5.2xlarge",
      "c5.4xlarge",
      "c5.9xlarge",
      "c5.12xlarge",
      "c5.18xlarge",
      "c5.large",
      "c5.xlarge",
      "i3.2xlarge",
      "i3.4xlarge",
      "i3.large",
      "i3.xlarge",
      "m3.2xlarge",
      "m3.large",
      "m3.medium",
      "m3.xlarge",
      "m4.2xlarge",
      "m4.4xlarge",
      "m4.large",
      "m4.xlarge",
      "m5.2xlarge",
      "m5.4xlarge",
      "m5.8xlarge",
      "m5.large",
      "m5.xlarge",
      "m5a.2xlarge",
      "m5a.4xlarge",
      "m5a.8xlarge",
      "m5a.large",
      "m5a.xlarge",
      "m5ad.2xlarge",
      "m5ad.4xlarge",
      "m5ad.8xlarge",
      "m5ad.large",
      "m5ad.xlarge",
      "r3.2xlarge",
      "r3.4xlarge",
      "r3.large",
      "r3.xlarge",
      "r4.2xlarge",
      "r4.4xlarge",
      "r4.large",
      "r4.xlarge",
      "r5.2xlarge",
      "r5.4xlarge",
      "r5.large",
      "r5.xlarge",
      "r5a.2xlarge",
      "r5a.4xlarge",
      "r5a.large",
      "r5a.xlarge",
      "r5ad.2xlarge",
      "r5ad.4xlarge",
      "r5ad.large",
      "r5ad.xlarge",
      "t2.2xlarge",
      "t2.large",
      "t2.medium",
      "t2.micro",
      "t2.nano",
      "t2.small",
      "t2.xlarge"
    ],
    "worker": {
      "ctopsIamRole": "EKSAdminRole",
      "controlPlaneIamRole": "EKSControlPlaneRole"
    },
    "regions": [
      {
        "shortName": "usw2",
        "envs": [
          {
            "name": "prod",
            "cidr": [
              {
                "name": "MANAGEMENT-LAYER",
                "cidrs": [
                  "10.11.33.0/21",
                  "10.11.222.0/19",
                  "10.22.22.0/17"
                ]
              }
            ],
            "thanos_bucket": "ct-prometheus-thanos-prod-uswest2",
            "smtp_smarthost": "mailprod-uswest2.cloudtrust.rocks:25",
            "vaultAddress": "https://ha-vault.eks.prod.uswest2.cloudtrust.rocks"
          },
          {
            "name": "qa"
          },
          {
            "name": "dev"

          }
        ],
        "name": "us-west-2"
      },
      {
        "shortName": "use1",
        "envs": [
          {
            "name": "qa"

          },
          {
            "name": "prod"
          }
        ],
        "name": "us-east-1"
      },
      {
        "shortName": "use2",
        "envs": null,
        "name": "us-east-2"
      },
      {
        "shortName": "usw1",
        "envs": null,
        "name": "us-west-1"
      },
      {
        "shortName": "aps1",
        "envs": null,
        "name": "ap-south-1"
      },
      {
        "shortName": "euw1",
        "envs": [
          {
            "name": "prod"
          }
        ],
        "name": "eu-west-1"
      },
      {
        "shortName": "euw2",
        "envs": [
          {
            "name": "prod"
          }
        ],
        "name": "eu-west-2"
      },
      {
        "shortName": "euw3",
        "envs": [
          {
            "name": "prod",
            "cidr": [
              {
                "name": "ICHS-MANAGEMENT-LAYER",
                "cidrs": [
                  "10.148.0.0/17"
                ]
              }
            ]
          }
        ],
        "name": "eu-west-3"
      },
      {
        "shortName": "euc1",
        "envs": null,
        "name": "eu-central-1"
      },
      {
        "shortName": "apne3",
        "envs": null,
        "name": "ap-northeast-3"
      },
      {
        "shortName": "apne2",
        "envs": null,
        "name": "ap-northeast-2"
      },
      {
        "shortName": "apne1",
        "envs": null,
        "name": "ap-northeast-1"
      },
      {
        "shortName": "sae1",
        "envs": null,
        "name": "sa-east-1"
      },
      {
        "shortName": "cac1",
        "envs": [
          {
            "name": "prod",
            "cidr": [
              {
                "name": "MANAGEMENT-LAYER",
                "cidrs": [
                  "10.001.001.0/21",
                  "10.222.222.0/19"
                ]
              }
            ]
          }
        ],
        "name": "ca-central-1"
      },
      {
        "shortName": "apse1",
        "envs": null,
        "name": "ap-southeast-1"
      }
    ],
    "businessEntityOwner": [
      {
        "name": "intcloud",
        "BU": [
          "BUTEST"
        ],
        "clusterFqdnPrefix": ".P1",
        "email": "test@xyz.com",
        "envs": [
          {
            "name": "dev",
            "asgWorkerIamRoleName": "EKSWorkerRole"
          },
          {
            "name": "qa",
            "asgWorkerIamRoleName": "EKSWorkerRole"
          },
          {
            "name": "prod",
            "asgWorkerIamRoleName": "EKSWorkerRole"
          }
        ]
      }
    ],
    "envs": [
      {
        "name": "dev",
        "bpEnvBucketAndExternalIdName": "ichsdev",
        "workerAsgRole": "AWSServiceRoleForAutoScaling",
        "keyPair": "KP-07042020",
        "clusterFqdn": "eksdev.rocks",
        "hostedZoneID": "Z070XXXXX"
      },
      {
        "name": "qa",
        "bpEnvBucketAndExternalIdName": "a",
        "workerAsgRole": "AWSServiceRoleForAutoScaling",
        "keyPair": "KP-01102018",
        "clusterFqdn": "eksqa.rocks",
        "hostedZoneID": "Z0387XXXX"
      },
      {
        "name": "prod",
        "bpEnvBucketAndExternalIdName": "prod",
        "workerAsgRole": "AWSServiceRoleForAutoScaling",
        "keyPair": "KP-30102018",
        "clusterFqdn": "eksprd.rocks",
        "hostedZoneID": "Z07XXXXXX"
      }
    ],
    "controlPlane": {
      "publicEndpoint": false,
      "iamRole": "EKSControlPlaneRole"
    },
    "blueprintList": [
      {
        "requestId": "eks-test-blueprint-v1",
        "reqType": "blueprint",
        "cloud": "aws",
        "businessEntityOwner": "be",
        "businessUnitOwner": "bu",
        "dateEntered": "2022-02-27T18:38:54.689398Z",
        "createdBy": "madhu",
        "error": "",
        "foundation": {
          "cert-manager": "v1.0.1",
          "certissueraddon": "0.1.0",
          "clusterautoscaleraddon": "6.2.0",
          "dashboardaddon": "2.0.1",
          "external-dns": "3.3.1",
          "filebeat": "7.15.0",
          "ingress": "2.16.0",
          "istio": "1.11.2",
          "kiali": "1.32.0",
          "metricsaddon": "2.11.1",
          "monitoringaddon": "8.12.12",
          "opa": "3.1.1",
          "secretloader": "0.1.2",
          "stackrox": "64.0.0",
          "thanossidecar": "v0.12.2",
          "vault-injector": "1.1.9",
          "vpa": "0.8.0"
        }
      }
    ]
  });
  const [selectedEnv, setSelectedEnv] = useState({})
  const [selectedRegion, setSelectedRegion] = useState("")
  const [modal2, setModal2] = useState(false);
  const [errorStr, setErrorStr] = useState({});
  const {register, handleSubmit, errors} = useForm({defaultValues: defaultValues});
  const [selectedBusinessUnitOwner, setSelectedBusinessUnitOwner] = useState("")
  const [inputData, setInputData] = useState({})
  const [mgmtVpcCidrs, setMgmtVpcCidrs] = useState([])
  const [blueprintConfig, setBlueprintConfig] = useState([]);
  const [asg, setAsg] = useState([]);
  const [beConfig, setBeConfig] = useState([]);

  // useEffect(() => {
  //   common.GetAWSWebAppConfig(setWebConfig, setLoading, setErrorStr)
  // }, []);

  useEffect(() => {
    common.GetBlueprintConfig(setBlueprintConfig, setLoading, setErrorStr)
  }, []);

  //@todo enternal-dns, cert-manager, vault-injector has to be handled seperatly
  const validateAndOpenPopup = (data) => {
    let blueprint
    webConfig.blueprintList.forEach(function (item, index) {
      if (item.requestId === data.ClusterDetails.blueprint) {
        blueprint = item
      }
    });

    let selectedRegion
    webConfig.regions.forEach(function (item, index) {
      if (item.shortName === data.ClusterDetails.region) {
        selectedRegion = item
      }
    });

    data.ClusterDetails.clusterName = blueprint.businessEntityOwner + "-" + data.ClusterDetails.name + "-eks-" + data.ClusterDetails.envText + "-" + data.ClusterDetails.region
    data.ClusterDetails.cloud = "aws"
    if (data.WorkerDetails.asg) {
      data.WorkerDetails.asg = JSON.parse(data.WorkerDetails.asg)
      if (data.WorkerDetails.asg.length === 0) {
        alert("Atleast one ASG should be added")
      }
    } else {
      data.WorkerDetails.asg = []
    }

    if (data.ClusterDetails.config) {
      data.ClusterDetails.config = JSON.parse(data.ClusterDetails.config)
    } else {
      data.ClusterDetails.config = []
    }

    if (data.ClusterDetails.namespaces && data.ClusterDetails.namespaces !== "") {
      data.ClusterDetails.config = [{
        "be": blueprint.businessEntityOwner,
        "bu": blueprint.businessUnitOwner,
        "namespace": data.ClusterDetails.namespaces.split(",")
      }, ...data.ClusterDetails.config]
    }
    data.ClusterDetails.region = selectedRegion.name
    if (data.ClusterDetails.productIamRoles !== "") {
      data.ClusterDetails.productIamRoles = data.ClusterDetails.productIamRoles.split(",")
    }else {
      data.ClusterDetails.productIamRoles = null
    }

    data.WorkerDetails.mgmtVpcCidrs = data.WorkerDetails.mgmtVpcCidrs.split(",")
    data.WorkerDetails.cgNatEnabled = (data.WorkerDetails.cgNatEnabled.toLowerCase() === 'true')
    data.createdBy = getGlobal().user.email
    delete data.ClusterDetails.name
    setLoading(true)
    console.log("validateAndOpenPopup:", data)
    // let url = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/validateInputCluster`
    // axios.post(url, data)
    //   .then(response => {
    //     setErrorStr({error: ""})
    //     setInputData(response.data)
    //     setModal2(true)
    //     setLoading(false)
    //   }).catch(error => {
    //   setErrorStr({error: "Validation errors:" + JSON.stringify(error.response.data)});
    //   setModal2(false)
    //   setLoading(false)
    // });
  }

  const onPageSubmit = () => {
    let url = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/createCluster`
    setLoading(true)
    // axios.post(url, inputData)
    //   .then(response => {
    //     history.push({
    //       pathname: '/NewCluster/SubmitNewCluster/aws',
    //       search: `?name=${inputData.cluster.name}&cloud=${inputData.cluster.cloud}&region=${inputData.cluster.region}&env=${inputData.cluster.environment}`,
    //       state: {detail: response, errors: null}
    //     })
    //     setLoading(false)
    //   }).catch(err => {
    //   history.push({
    //     pathname: '/NewCluster/SubmitNewCluster/aws',
    //     search: `?name=${inputData.cluster.name}&cloud=${inputData.cluster.cloud}&region=${inputData.cluster.region}&env=${inputData.cluster.environment}`,
    //     state: {detail: null, errors: err}
    //   })
    //   setLoading(false)
    // });
  }

  const toggle = () => {
    setModal2(!modal2);
  }

  const onBlueprintChange = (event) => {
    let val = event.target.value
    if (!event.target.value && val === "") {
      return
    }

    let arr = val.split("-")
    setSelectedBusinessUnitOwner(arr[1])
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              Cluster details{(errorStr === {}) ? "" : (<div color={"danger"}><Rjv valueRenderer={raw => {
              return <h6 style={{color: "red"}}>{String(raw)}</h6>
            }} hideRoot={true} data={(errorStr && errorStr.error) ? errorStr.error : ""} name={false}/></div>)}
            </CCardHeader>

            <form name="myform" method="post" encType="multipart/form-data" className="form-horizontal">
              <CCardBody>
                {loading ? (
                  <div><CSpinner color="primary" style={{width: '4rem', height: '4rem'}}/><h3>Please wait..</h3>
                  </div>) : (<></>)}
                <CRow>
                  <CCol className="border border-light">
                    <AwsClusterDetails
                      webConfig={webConfig}
                      blueprints={webConfig.blueprintList}
                      selectedEnv={selectedEnv}
                      setSelectedEnv={setSelectedEnv}
                      selectedRegion={selectedRegion}
                      setSelectedRegion={setSelectedRegion}
                      register={register} errors={errors}
                      onBlueprintChange={onBlueprintChange}
                      selectedBusinessUnitOwner={selectedBusinessUnitOwner}
                      mgmtVpcCidrs={mgmtVpcCidrs}
                      setMgmtVpcCidrs={setMgmtVpcCidrs}
                      blueprintConfig={blueprintConfig}
                      beConfig={beConfig}
                      setBeConfig={setBeConfig}
                    />
                  </CCol>
                  <CCol className="border border-light">
                    <AwsWorkerDetails webConfig={webConfig} mgmtVpcCidrs={mgmtVpcCidrs} errors={errors}
                                      register={register} asg={asg} setAsg={setAsg}/>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CButton type="button" size="sm" color="primary" onClick={handleSubmit(validateAndOpenPopup)}>Verify &
                  Submit</CButton>
                <CButton type="reset" size="sm" color="danger">Reset</CButton>
              </CCardFooter>
              <span className="text-danger">*ProductIamRoles is optional</span>
            </form>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={modal2} size="lg" scrollable={true} onClose={toggle}>
        <CModalHeader closeButton>input.yaml</CModalHeader>
        <CModalBody>
          {loading ? (
            <div><CSpinner color="primary" style={{width: '4rem', height: '4rem'}}/><h3>Please wait creating the GIT
              Pull request..</h3></div>) : (<Rjv data={inputData} hideRoot={true}/>)}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" disabled={loading} onClick={onPageSubmit}>Create</CButton>
          <CButton color="secondary" disabled={loading} onClick={toggle}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AwsNewCluster
