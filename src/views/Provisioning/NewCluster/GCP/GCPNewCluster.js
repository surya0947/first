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
import GCPClusterDetails from "./GCPClusterDetails";
import GCPWorkerDetails from "./GCPWorkerDetails";
import Rjv from 'react-json-tree-viewer'
import * as common from "../common/common";
import {getGlobal} from "reactn";

const defaultValues = {};

const GCPNewCluster = (props) => {
  //let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [webConfig, setWebConfig] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [inputData1, setInputData1] = useState({});
  const [errorStr, setErrorStr] = useState({});
  const {register, handleSubmit, errors} = useForm({defaultValues: defaultValues});
  const [selectedEnv, setSelectedEnv] = useState({})
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedBusinessUnitOwner, setSelectedBusinessUnitOwner] = useState("")
  const [selectedBlueprint, setSelectedBlueprint] = useState("")
  const [subnets, setSubnets] = useState([])
  const [virtualNetwork, setVirtualNetwork] = useState([])
  const [addressPrefix, setAddressPrefix] = useState([])
  const [beConfig, setBeConfig] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [asg, setAsg] = useState([]);

  useEffect(() => {
    common.GetGCPWebAppConfig(setWebConfig, setLoading, setErrorStr)
  }, []);

  const onBlueprintChange = (event) => {
    let val = event.target.value
    if (!event.target.value && val === "") {
      return
    }

    setSelectedBlueprint(val)
    let arr = val.split("-")
    setSelectedBusinessUnitOwner(arr[1])
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
                {/*<CRow>*/}
                {/*  <CCol className="border border-light">*/}
                {/*    <GCPClusterDetails setSelectedEnv={setSelectedEnv}*/}
                {/*                       setSelectedRegion={setSelectedRegion}*/}
                {/*                       setNetworks={setNetworks}*/}
                {/*                       selectedEnv={selectedEnv}*/}
                {/*                       selectedRegion={selectedRegion}*/}
                {/*                       webConfig={webConfig}*/}
                {/*                       blueprints={webConfig.blueprintList}*/}
                {/*                       register={register} errors={errors}*/}
                {/*                       onBlueprintChange={onBlueprintChange}*/}
                {/*                       selectedBusinessUnitOwner={selectedBusinessUnitOwner}*/}
                {/*                       setSelectedBlueprint={setSelectedBlueprint}*/}
                {/*                       selectedBlueprint={selectedBlueprint}*/}
                {/*                       beConfig={beConfig} setBeConfig={setBeConfig}*/}
                {/*    />*/}
                {/*  </CCol>*/}
                {/*  <CCol className="border border-light">*/}
                {/*    <GCPWorkerDetails webConfig={webConfig}*/}
                {/*                      networks={networks}*/}
                {/*                      setSelectedEnv={setSelectedEnv}*/}
                {/*                      asg={asg} setAsg={setAsg}*/}
                {/*                      setSubnets={setSubnets}*/}
                {/*                      setVirtualNetwork={setVirtualNetwork}*/}
                {/*                      subnets={subnets}*/}
                {/*                      virtualNetwork={virtualNetwork}*/}
                {/*                      setAddressPrefix={setAddressPrefix}*/}
                {/*                      addressPrefix={addressPrefix}*/}
                {/*                      errors={errors}*/}
                {/*                      register={register}*/}
                {/*    />*/}
                {/*  </CCol>*/}
                {/*</CRow>*/}
              </CCardBody>
              <CCardFooter>
                <CButton type="button" size="sm" color="primary">Verify &
                  Submit</CButton>
                <CButton type="reset" size="sm" color="danger">Reset</CButton>
              </CCardFooter>
            </form>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={modal2} size="lg" scrollable={true} onClose={toggle}>
        <CModalHeader closeButton>input.yaml</CModalHeader>
        <CModalBody>
          {loading ? (
            <div><CSpinner color="primary" style={{width: '4rem', height: '4rem'}}/><h3>Please wait creating the GIT
              Pull request..</h3></div>) : (<Rjv data={inputData1} hideRoot={true}/>)}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" disabled={loading} >Create</CButton>
          <CButton color="secondary" disabled={loading} onClick={toggle}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default GCPNewCluster
