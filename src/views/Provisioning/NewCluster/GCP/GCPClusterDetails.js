import React, {useState} from 'react';
import {CButton, CCol, CCardGroup, CFormCheck, CFormLabel, CRow, CFormSelect} from "@coreui/react";
import * as constants from "../../../constants"

import Rjv from "react-json-tree-viewer";
import GCPBEConfig from "./GCPBEConfig";

const GCPClusterDetails = (props) => {
  const [projects, setProjects] = useState([])
  const [modalConfig, setModalConfig] = useState(false);
  const [regionShortName, setRegionShortName] = useState([])

  const onEnvChangeEnv = (event) => {
    let ftemp = JSON.parse(event.target.value);
    props.setNetworks([])
    props.setSelectedEnv(ftemp)
    let projs = []
    ftemp.projects && ftemp.projects.length > 0 && ftemp.projects.forEach(function (p, ) {
      projs.push(p.ID)
    })
    props.setNetworks(ftemp.vpcProject)
    setProjects(projs)
  }

  const onRegionChange = (event) => {
    (props.webConfig.regions && props.webConfig.regions.length > 0) && props.webConfig.regions.forEach(function (schema) {
      if (event.target.value === schema.shortName) {
        props.setSelectedRegion(schema.name)
        setRegionShortName(schema.shortName)
      }
    });
  }

  const validateAndOpenPopup = (data) => {
    setModalConfig(!modalConfig)
  }

  const clearConfigs = () => {
    props.setBeConfig([])
  }

  return (
    <>
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel>Env</CFormLabel>
        </CCol>
        <CCol md="9">
          <input type="hidden" name="ClusterDetails.env" value={props.selectedEnv.name} ref={props.register()}/>
          {
            (props.webConfig.envs && props.webConfig.envs.map((env, i) => {
              let disable = false
              return (
                <CCardGroup variant="custom-radio" inline>
                  <CFormCheck custom type="radio" name="ClusterDetails.env1"
                               id={"clusterEnv" + env.name}
                               value={JSON.stringify(env)}
                               onChange={onEnvChangeEnv}
                               disabled={disable}/>
                  <CFormLabel variant="custom-checkbox"
                          htmlFor={"clusterEnv" + env.name}>{env.name}</CFormLabel>
                </CCardGroup>
              );
            }))
          }
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.env && props.errors.ClusterDetails.env.type === "required" &&
            <h6><span size="sm" className="text-danger">Select Environment</span></h6>}
          </CRow>
        </CCol>
      </CCardGroup>
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel htmlFor="select">Projects</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <CFormSelect className="form-control" name="ClusterDetails.project" id="ClusterDetails.project"
                   innerRef={props.register({required: true})}>
            <option value="">Select Project</option>
            {
              (projects.length > 0) && projects.map((schema, i) => {
                return (<option key={schema} value={schema}>{schema}</option>);
              })
            }
          </CFormSelect>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.project && props.errors.ClusterDetails.project.type === "required" &&
            <h6><span size="sm" className="text-danger">Select Project</span></h6>}
          </CRow>
        </CCol>
      </CCardGroup>
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel htmlFor="select">Region</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <CFormSelect className="form-control" name="ClusterDetails.region" id="ClusterDetails.region"
                   onChange={onRegionChange}
                   innerRef={props.register({required: true})}>
            <option value="">Select Region</option>
            {
              (props.webConfig.regions && props.webConfig.regions.length > 0) && props.webConfig.regions.map((schema) => {
                return (<option key={schema.name} value={schema.shortName}>{schema.name}</option>);
              })
            }
          </CFormSelect>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.env && props.errors.ClusterDetails.env.type === "required" &&
            <h6><span size="sm" className="text-danger">Select Environment</span></h6>}
            {props.errors.ClusterDetails && props.errors.ClusterDetails.region && props.errors.ClusterDetails.region.message === "" &&
            <h6><span size="sm" className="text-danger">Select Region</span></h6>}
          </CRow>
        </CCol>
      </CCardGroup>
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel htmlFor="select">K8SVersion</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <CFormSelect className="form-control" name="ClusterDetails.k8sVersion" id="ClusterDetails.k8sVersion"
                   innerRef={props.register}>
            {
              (props.webConfig.k8sVersions && props.webConfig.k8sVersions.length > 0) && props.webConfig.k8sVersions.map((schema) => {
                return (<option key={schema} value={schema}>{schema}</option>);
              })
            }
          </CFormSelect>
        </CCol>
      </CCardGroup>
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel htmlFor="select">Blueprint</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <CFormSelect className="form-control" name="ClusterDetails.blueprint" id="ClusterDetails.blueprint"
                   innerRef={props.register({required: true})} onChange={props.onBlueprintChange}>
            <option value="">Select Blueprint</option>
            {
              (props.webConfig.blueprintList && props.webConfig.blueprintList.length > 0) && props.webConfig.blueprintList.map((schema) => {
                return (<option key={schema.requestId} value={schema.requestId}>{schema.requestId}</option>);
              })
            }
          </CFormSelect>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.blueprint && props.errors.ClusterDetails.blueprint.message === "" &&
            <h6><span size="sm" className="text-danger">Select blueprint</span></h6>}
          </CRow>
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
            <input className="form-control" type="text" name="ClusterDetails.name" placeholder="Name"
                   ref={props.register(constants.NAME_Validation)}/>
            <div className="input-group-append">
              <span className="input-group-text">{"-gke-"}</span>
            </div>
            <input className="form-control" type="text" name="ClusterDetails.envText" placeholder="Env"
                   defaultValue={props.selectedEnv.name}
                   ref={props.register(constants.NAME_Validation)}/>
            <div className="input-group-append">
              <span className="input-group-text">{"-" + regionShortName}</span>
            </div>
          </div>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.name?.message && <p className="text-danger">
              {props.errors.ClusterDetails.name?.message}</p>}
          </CRow>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.envText?.message && <p className="text-danger">
              {props.errors.ClusterDetails.envText?.message}</p>}
          </CRow>
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
                 ref={props.register()}/>
          {/*<input className="form-control" type="text" name="WorkerDetails.asg"  ref={props.register({required: true})}/>*/}
          <CButton type="button" size="sm" color="primary"
                   onClick={validateAndOpenPopup}>AddBlueprintConfig</CButton> &nbsp;
          <CButton type="button" size="sm" color="primary" onClick={clearConfigs}>Clear</CButton>
          <GCPBEConfig modalConfig={modalConfig} setModalConfig={setModalConfig}
                       beList={props.webConfig.businessEntityOwner} beConfig={props.beConfig}
                       setBeConfig={props.setBeConfig}/>

          <Rjv data={props.beConfig} hideRoot={true}/>
        </CCol>
        <CRow>
          {props.errors.ClusterDetails && props.errors.ClusterDetails.config?.message &&
          <p className="text-danger">{props.errors.ClusterDetails.config?.message}</p>}
        </CRow>
      </CCardGroup>
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel htmlFor="select">ProdectTeamGroupID(Tag)</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <input type="email" className="form-control" name="ClusterDetails.email" placeholder="Name"
                 ref={props.register(constants.NAME_Validation)}/>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.email?.message && <p className="text-danger">
              {props.errors.ClusterDetails.email?.message}</p>}
          </CRow>
        </CCol>
      </CCardGroup>
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel htmlFor="select">SpinnakerSAId</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <input type="email" className="form-control" name="ClusterDetails.spinnakerSAId" placeholder="Name"
                 ref={props.register(constants.NAME_Validation)}/>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.spinnakerSAId?.message && <p className="text-danger">
              {props.errors.ClusterDetails.spinnakerSAId?.message}</p>}
          </CRow>
        </CCol>
      </CCardGroup>
    </>
  )
}

export default GCPClusterDetails;
