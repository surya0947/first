import React, {useState} from 'react';
import {CButton, CCol, CCardGroup, CFormCheck, CFormLabel, CRow, CFormSelect} from "@coreui/react";
import * as constants from "../../../constants"
//import AzureBeBuConfig from "AzureBeBuConfig";
import Rjv from "react-json-tree-viewer";
import AzureBeBuConfig from "./AzureBeBuConfig";

const AzureClusterDetails = (props) => {
  const [regions, setRegions] = useState([])
  const [modalConfig, setModalConfig] = useState(false);

  const onEnvChangeEnv = (event) => {
    let ftemp = JSON.parse(event.target.value);
    setRegions([])
    props.setSelectedEnv(ftemp)
    props.setVirtualNetwork([])
    props.setSubnets([])
    props.setAddressPrefix([])

    let regions1 = []
    props.regions.forEach(function (item, index) {
      if (item.envs && item.envs.length > 0) {
        item.envs.forEach(function (env, index) {
          if (env.name === ftemp.fullName) {
            regions1.push(item)
          }
        });
      }
    });
    setRegions(regions1)
    props.setVirtualNetworks(event.target.value, props.selectedRegion, props.selectedBlueprint)
  }

  const onRegionChange = (event) => {
    props.setVirtualNetwork([])
    props.setSubnets([])
    props.setAddressPrefix([])
    props.setSelectedRegion(event.target.value)
    props.setVirtualNetworks(props.selectedEnv, event.target.value, props.selectedBlueprint)
  }

  const throwError = (event) => {
    if (event.target.length === 1) {
      alert("Select environment first")
    }
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
          <CFormLabel>Subscription</CFormLabel>
        </CCol>
        <CCol md="9">
          {
            (props.subscriptions && props.subscriptions.length > 0 && props.subscriptions.map((subcItem, i) => {
              let disable = false
              return (
                <CRow key={"clusterEnv" + subcItem.subscriptionID}>
                  <CCardGroup variant="custom-radio" inline>
                    <CFormCheck custom type="radio" name="ClusterDetails.env"
                                 id={"clusterEnv" + subcItem.subscriptionID}
                                 value={JSON.stringify(subcItem)}
                                 onChange={onEnvChangeEnv} innerRef={props.register({required: true})}
                                 disabled={disable}/>
                    <CFormLabel variant="custom-checkbox"
                            htmlFor={"clusterEnv" + subcItem.subscriptionID}>{subcItem.fullName}</CFormLabel>
                  </CCardGroup>
                </CRow>
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
          <CFormLabel htmlFor="select">Region</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <CFormSelect className="form-control" name="ClusterDetails.region" id="ClusterDetails.region"
                   onChange={onRegionChange}
                   onClick={throwError}
                   innerRef={props.register({required: true})}>
            <option value="">Select Region</option>
            {
              (regions.length > 0) && regions.map((schema) => {
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
              (props.k8sVersion && props.k8sVersion.length > 0) && props.k8sVersion.map((schema) => {
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
              (props.blueprints && props.blueprints.length > 0) && props.blueprints.map((schema) => {
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
              <span className="input-group-text">{"-" + props.cloudType[1] + "-"}</span>
            </div>
            <input className="form-control" type="text" name="ClusterDetails.envText" placeholder="Env"
                   defaultValue={props.selectedEnv.env}
                   ref={props.register(constants.NAME_Validation)}/>
            <div className="input-group-append">
              <span className="input-group-text">{"-" + props.selectedRegion}</span>
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
          <CFormLabel htmlFor="select">ClusterResourceGroup</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <CFormSelect className="form-control" name="ClusterDetails.clusterResourceGroup" id="clusterResourceGroup"
                   innerRef={props.register({required: true})}>
            <option value="">Select clusterResourceGroup</option>
            {
              props.clusterResourceGroup && Object.entries(props.clusterResourceGroup).map((schema, i) => {
                return (<option key={schema[1]} value={schema[1]}>{schema[1]}</option>);
              })
            }
          </CFormSelect>
          <CRow>
            {props.errors.ClusterDetails && props.errors.ClusterDetails.clusterResourceGroup && props.errors.ClusterDetails.clusterResourceGroup.message === "" &&
              <h6><span size="sm" className="text-danger">Select clusterResourceGroup</span></h6>}
          </CRow>
        </CCol>
      </CCardGroup>
      {/*<CCardGroup row>*/}
      {/*  <CCol md="3">*/}
      {/*    <CFormLabel>Namespaces <br/><br/></CFormLabel>*/}
      {/*    /!*<CButton shape="pill" color="danger" size="sm" onClick={handleRemoveClick()}>Delete  Config</CButton> </CFormLabel>*!/*/}
      {/*  </CCol>*/}
      {/*  <CCol xs="12" md="9">*/}
      {/*    <TagsInput tags={[]} register={props.register} errors={props.errors} name={"ClusterDetails.namespaces"}*/}
      {/*               required={false}/>*/}
      {/*  </CCol>*/}
      {/*</CCardGroup>*/}
      <CCardGroup row>
        <CCol md="3">
          <CFormLabel htmlFor="text-input">Blueprint Config</CFormLabel>
        </CCol>
        <CCol xs="12" md="9">
          <input className="form-control" type="hidden" name="ClusterDetails.config"
                 value={JSON.stringify(props.beConfig)}
                 placeholder="Name"
                 ref={props.register()}/>
          <CButton type="button" size="sm" color="primary"
                   onClick={validateAndOpenPopup}>AddBlueprintConfig</CButton> &nbsp;
          <CButton type="button" size="sm" color="primary" onClick={clearConfigs}>Clear</CButton>
          <AzureBeBuConfig modalConfig={modalConfig} setModalConfig={setModalConfig}
                           beList={props.blueprintConfig.azureBusinessEntityOwner} beConfig={props.beConfig}
                           setBeConfig={props.setBeConfig}/>

          <Rjv data={props.beConfig} hideRoot={true}/>
        </CCol>
        <CRow>
          {props.errors.ClusterDetails && props.errors.ClusterDetails.config?.message &&
            <p className="text-danger">{props.errors.ClusterDetails.config?.message}</p>}
        </CRow>
      </CCardGroup>
    </>
  )
}

export default AzureClusterDetails;
