import React, {useState} from 'react';
import {CButton, CCardBody, CCardGroup, CCol, CFormCheck, CFormLabel, CFormSelect} from "@coreui/react";
import TagsInput from "../TagsInput";
import Rjv from "react-json-tree-viewer";
import BEConfig from "../common/BEConfig";
//import * as common from "../common/common";

const AwsClusterDetails = (props) => {
  const [regions, setRegions] = useState(["us-west-2", "us-west-1"])
  const [modalConfig, setModalConfig] = useState(false);

  const onEnvChangeEnv = (event) => {
    // let ftemp = JSON.parse(event.target.value);
    // props.setSelectedEnv(ftemp)
    // let regions1 = []
    // props.webConfig.regions.forEach(function (item, i) {
    //   if (item.envs && item.envs.length > 0) {
    //     item.envs.forEach(function (env, j) {
    //       if (env.name === ftemp.name) {
    //         regions1.push(item)
    //       }
    //     });
    //   }
    // });
    // setRegions(regions1)
    // setMgmtVpcCidrs(event.target.value, props.selectedRegion)
  }

  const onRegionChange = (event) => {
    // props.setSelectedRegion(event.target.value)
    // setMgmtVpcCidrs(props.selectedEnv, event.target.value)
  }

  function setMgmtVpcCidrs(env, region) {
    // if ((env && env.name === "") || region === "") {
    //   props.setMgmtVpcCidrs([])
    // } else {
    //   props.webConfig.regions.forEach(function (item, index) {
    //     if (item.shortName === region) {
    //       item.envs && item.envs.forEach(function (item1, index) {
    //         if (item1.name === env.name) {
    //           props.setMgmtVpcCidrs(item1.cidr)
    //         }
    //       });
    //     }
    //   });
    // }
  }

  const throwError = (event) => {
    if (event.target.length === 1) {
      alert("Select environment first")
    }
  }

  const validateAndOpenPopup = (data) => {
    //setModalConfig(!modalConfig)
  }

  const clearConfigs = () => {
    props.setBeConfig([])
  }

  const envs = ["qa", "prod"]
  return (
    <>
      <CCardBody>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel>AWSAccount</CFormLabel>
          </CCol>
          <CCol md="9">
            <input type="hidden" name="ClusterDetails.env" value={props.selectedEnv.name}/>

            <CCardGroup variant="custom-radio" key="clusterEnv1" inline>
              <CFormCheck custom type="radio" name="ClusterDetails.env1" id="clusterEnv1" value="qa"/>
              <CFormLabel variant="custom-checkbox" htmlFor={"clusterEnv1"}>QA</CFormLabel>
            </CCardGroup>

            <CCardGroup variant="custom-radio" key="clusterEnv2" inline>
              <CFormCheck custom type="radio" name="ClusterDetails.env2" id="clusterEnv2" value="qa"/>
              <CFormLabel variant="custom-checkbox" htmlFor={"clusterEnv2"}>Prod</CFormLabel>
            </CCardGroup>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">Region</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.region" id="ClusterDetails.region"
                         onChange={onRegionChange}
                         onClick={throwError}    >
              <option value="">Select Region</option>
              <option value="">us-west-2</option>
              <option value="">us-west-1</option>
            </CFormSelect>
            {/*<CRow>*/}
            {/*  {props.errors.ClusterDetails && props.errors.ClusterDetails.env && props.errors.ClusterDetails.env.type === "required" &&*/}
            {/*  <h6><span size="sm" className="text-danger">Select Environment</span></h6>}*/}
            {/*  {props.errors.ClusterDetails && props.errors.ClusterDetails.region && props.errors.ClusterDetails.region.message === "" &&*/}
            {/*  <h6><span size="sm" className="text-danger">Select Region</span></h6>}*/}
            {/*</CRow>*/}
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">K8SVersion</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.k8sVersion" id="ClusterDetails.k8sVersion"
                         innerRef={props.register}>
              <option value="">Select k8s</option>
              <option value="">1.20</option>
              <option value="">1.21</option>
            </CFormSelect>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">Blueprint</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.blueprint" id="ClusterDetails.blueprint"
                         onChange={props.onBlueprintChange}>
              <option value="">Select Blueprint</option>
              <option value="">BP-v1</option>
            </CFormSelect>
            {/*<CRow>*/}
            {/*  {props.errors.ClusterDetails && props.errors.ClusterDetails.blueprint && props.errors.ClusterDetails.blueprint.message === "" &&*/}
            {/*  <h6><span size="sm" className="text-danger">Select blueprint</span></h6>}*/}
            {/*</CRow>*/}
          </CCol>
        </CCardGroup>

        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="text-input">ClusterName</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">{props.selectedBusinessUnitOwner} - </span>
              </div>
              <input className="form-control" type="text" name="ClusterDetails.name" placeholder="Name"/>
              <div className="input-group-append">
                <span className="input-group-text">{"-eks-"}</span>
              </div>
              <input className="form-control" type="text" name="ClusterDetails.envText" placeholder="Env"
                     defaultValue={props.selectedEnv.name}
              />
              <div className="input-group-append">
                <span className="input-group-text">{"-" + props.selectedRegion}</span>
              </div>
            </div>
            {/*<CRow>*/}
            {/*  {props.errors.ClusterDetails && props.errors.ClusterDetails.name?.message && <p className="text-danger">*/}
            {/*    {props.errors.ClusterDetails.name?.message}</p>}*/}
            {/*</CRow>*/}
            {/*<CRow>*/}
            {/*  {props.errors.ClusterDetails && props.errors.ClusterDetails.envText?.message &&*/}
            {/*  <p className="text-danger">*/}
            {/*    {props.errors.ClusterDetails.envText?.message}</p>}*/}
            {/*</CRow>*/}
          </CCol>
        </CCardGroup>

        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="text-input">Blueprint Config</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <input className="form-control" type="hidden" name="ClusterDetails.config"
                   value={JSON.stringify(props.beConfig)}
                   placeholder="Name"
            />
            {/*<input className="form-control" type="text" name="WorkerDetails.asg"  ref={props.register({required: true})}/>*/}
            <CButton type="button" size="sm" color="primary"
                     onClick={validateAndOpenPopup}>AddBlueprintConfig</CButton> &nbsp;
            <CButton type="button" size="sm" color="primary" onClick={clearConfigs}>Clear</CButton>
            <BEConfig modalConfig={modalConfig} setModalConfig={setModalConfig}
                      beList={props.blueprintConfig.awsBusinessEntityOwner} beConfig={props.beConfig}
                      setBeConfig={props.setBeConfig}/>

            <Rjv data={props.beConfig} hideRoot={true}/>
          </CCol>
          {/*<CRow>*/}
          {/*  {props.errors.ClusterDetails && props.errors.ClusterDetails.config?.message &&*/}
          {/*  <p className="text-danger">{props.errors.ClusterDetails.config?.message}</p>}*/}
          {/*</CRow>*/}
        </CCardGroup>

        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">(ProductIamRoles)</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <TagsInput tags={[]} required={false}
                       name="ClusterDetails.productIamRoles"
                       placeholder="Add text and enter to add multiple Iam Roles"/>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">Email</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <input type="email" className="form-control" name="ClusterDetails.email" placeholder="Name"/>
            {/*<CRow>*/}
            {/*  {props.errors.ClusterDetails && props.errors.ClusterDetails.email?.message && <p className="text-danger">*/}
            {/*    {props.errors.ClusterDetails.email?.message}</p>}*/}
            {/*</CRow>*/}
          </CCol>
        </CCardGroup>
      </CCardBody>
    </>
  )
}

export default AwsClusterDetails;
