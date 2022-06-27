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
//import axios from "axios";
import AzureClusterDetails from "./AzureClusterDetails";
import AzureWorkerDetails from "./AzureWorkerDetails";
import Rjv from 'react-json-tree-viewer'
import * as common from "../common/common";
import {getGlobal} from "reactn";

const defaultValues = {
  clusterName: [],
  foundation: [],
  config: {},
  regionSelectOptions: [],
  env: "",
  addressPrefix: "1.1.1.1/10",
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

const AzureNewCluster = (props) => {
  //let history = useHistory();
  const [loading, setLoading] = useState(false);

  const [webConfig, setWebConfig] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [errorStr, setErrorStr] = useState({});
  const {register, handleSubmit, errors} = useForm({defaultValues: defaultValues});

  const [selectedEnv, setSelectedEnv] = useState({})
  const [selectedRegion, setSelectedRegion] = useState("")

  const [selectedBusinessUnitOwner, setSelectedBusinessUnitOwner] = useState("")
  const [selectedBlueprint, setSelectedBlueprint] = useState("")

  const [inputData, setInputData] = useState({})
  // const [globalInputData, setGlobalInputData] = useState({})
  const [virtualNetworksVar, setVirtualNetworksVar] = useState([])

  const [subnets, setSubnets] = useState([])
  const [virtualNetwork, setVirtualNetwork] = useState([])
  const [addressPrefix, setAddressPrefix] = useState([])
  const [clusterResourceGroup, setClusterResourceGroup] = useState([])
  const [blueprintConfig, setBlueprintConfig] = useState([])
  const [beConfig, setBeConfig] = useState([]);

  let cloudType = ["azure", "aks"]

  const onPageSubmit = () => {
    let url = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/createCluster`
    if (inputData.error && inputData.error !== "") {
      let isError = window.confirm("There are errors in the input. You want to cancel the submit? Yes/No")
      if (isError === true) {
        console.log("Action canceled")
        return
      }
    }
    // setLoading(true)
    // axios.post(url, inputData)
    //   .then(response => {
    //     history.push({
    //       pathname: '/NewCluster/SubmitNewCluster/azure',
    //       search: `?name=${inputData.cluster.name}&cloud=azure&region=${inputData.cluster.region}&env=${inputData.cluster.environment}&subscription=${inputData.cluster.subscription}`,
    //       state: {detail: response, errors: null}
    //     })
    //     setLoading(false)
    //   }).catch(err => {
    //   history.push({
    //     pathname: '/NewCluster/SubmitNewCluster/azure',
    //     search: `?name=${inputData.cluster.name}&cloud=azure&region=${inputData.cluster.region}&env=${inputData.cluster.environment}&subscription=${inputData.cluster.subscription}`,
    //     state: {detail: null, errors: err}
    //   })
    //   setLoading(false)
    // });
  }

  const toggle = () => {
    setModal2(!modal2);
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
                  {/*<CCol className="border border-light">*/}
                  {/*  <AzureClusterDetails subscriptions={webConfig.subscriptions}*/}
                  {/*                       envs={webConfig.envs}*/}
                  {/*                       regions={webConfig.regions}*/}
                  {/*                       setSelectedEnv={setSelectedEnv}*/}
                  {/*                       setSelectedRegion={setSelectedRegion}*/}
                  {/*                       selectedEnv={selectedEnv}*/}
                  {/*                       selectedRegion={selectedRegion}*/}
                  {/*                       webConfig={webConfig}*/}
                  {/*                       blueprints={webConfig.blueprintList}*/}
                  {/*                       register={register} errors={errors}*/}
                  {/*                       k8sVersion={webConfig.k8sVersions}*/}
                  {/*                       onBlueprintChange={onBlueprintChange}*/}
                  {/*                       selectedBusinessUnitOwner={selectedBusinessUnitOwner}*/}
                  {/*                       cloudType={cloudType}*/}
                  {/*                       setVirtualNetworks={setVirtualNetworks}*/}
                  {/*                       setSelectedBlueprint={setSelectedBlueprint}*/}
                  {/*                       selectedBlueprint={selectedBlueprint}*/}
                  {/*                       serverConfig={webConfig}*/}
                  {/*                       setSubnets={setSubnets}*/}
                  {/*                       setVirtualNetwork={setVirtualNetwork}*/}
                  {/*                       setAddressPrefix={setAddressPrefix}*/}
                  {/*                       addressPrefix={addressPrefix}*/}
                  {/*                       setClusterResourceGroup={setClusterResourceGroup}*/}
                  {/*                       clusterResourceGroup={clusterResourceGroup}*/}
                  {/*                       blueprintConfig={blueprintConfig}*/}
                  {/*                       beConfig={beConfig} setBeConfig={setBeConfig}*/}
                  {/*  />*/}
                  {/*</CCol>*/}
                  {/*<CCol className="border border-light">*/}
                  {/*  <AzureWorkerDetails instanceType={webConfig.instanceType}*/}
                  {/*                      virtualNetworksVar={virtualNetworksVar}*/}
                  {/*                      setSubnets={setSubnets}*/}
                  {/*                      setVirtualNetwork={setVirtualNetwork}*/}
                  {/*                      subnets={subnets}*/}
                  {/*                      virtualNetwork={virtualNetwork}*/}
                  {/*                      setAddressPrefix={setAddressPrefix}*/}
                  {/*                      addressPrefix={addressPrefix}*/}
                  {/*                      errors={errors}*/}
                  {/*                      register={register}*/}
                  {/*  />*/}
                  {/*  /!*<CCardBody>*!/*/}
                  {/*  /!*  <CCardHeader>*!/*/}
                  {/*  /!*    <CButton block color="link" className="text-left m-0 p-0"*!/*/}
                  {/*  /!*             onClick={() => setFoundationCollapse(!foundationCollapse)}>Foundation</CButton>*!/*/}
                  {/*  /!*  </CCardHeader>*!/*/}
                  {/*  /!*  <CCollapse show={foundationCollapse}>*!/*/}
                  {/*  /!*    <Foundations foundation={inputData.foundation}/>*!/*/}
                  {/*  /!*  </CCollapse>*!/*/}
                  {/*  /!*</CCardBody>*!/*/}
                  {/*</CCol>*/}
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CButton type="button" size="sm" color="primary" >Verify &
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

export default AzureNewCluster
