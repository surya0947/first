import React from 'react';
import {CCardBody, CCol, CCardGroup, CFormLabel, CRow, CFormSelect} from "@coreui/react";
import GroupedButtons from "../IncrDecrComp";

const AzureWorkerDetails = (props, {register}) => {
  const onResourceGroupChange = (event) => {
    props.setSubnets([])
    props.setVirtualNetwork([])
    props.setAddressPrefix([])
    Object.keys(props.virtualNetworksVar).forEach(function (item, index) {
      if (item === event.target.value) {
        props.setVirtualNetwork(props.virtualNetworksVar[item])
      }
    });
  }

  const onVirtualNetworkChange = (event) => {
    props.setSubnets([])
    props.setAddressPrefix([])
    props.virtualNetwork.forEach(function (item, index) {
      if (item.name === event.target.value) {
        props.setSubnets(item.subnets)
        props.setAddressPrefix(item.addressPrefixes)
      }
    });
  }

  return (
    <>
      <CCardBody>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="text-input">Agent Size</CFormLabel>
          </CCol>
          <CCol>
            <CRow>
              <CCol>
                <div>Min<GroupedButtons name="minSize" initValue={1} register={props.register}/></div>
              </CCol>
              <CCol>
                <div>Max<GroupedButtons name="maxSize" initValue={3} register={props.register}/></div>
              </CCol>
              <CCol>
                <div>Desired<GroupedButtons name="agentCount" initValue={1} register={props.register}/></div>
              </CCol>
            </CRow>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">VM Size</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="WorkerDetails.instanceType" id="instanceType"
                     innerRef={props.register}>
              {
                (props.instanceType && props.instanceType.length > 0) && props.instanceType.map((schema) => {
                  return (<option key={schema} value={schema}>{schema}</option>);
                })
              }
            </CFormSelect>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">vnetResourceGroup</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.networkResourceGroup" id="resourceGroup"
                     innerRef={props.register({required: true})} onChange={onResourceGroupChange}>
              <option value="">Select ResourceGroup</option>
              {
                props.virtualNetworksVar && Object.keys(props.virtualNetworksVar).map(schema => {
                  return (<option key={schema} value={schema}>{schema}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.networkResourceGroup && props.errors.ClusterDetails.networkResourceGroup.message === "" &&
                <h6><span size="sm" className="text-danger">Select resourceGroup</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">Virtual Networks</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.virtualNetwork" id="virtualNetwork"
                     innerRef={props.register({required: true})} onChange={onVirtualNetworkChange}>
              <option value="">Select Virtual Networks</option>
              {
                props.virtualNetwork && props.virtualNetwork.map((schema) => {
                  return (<option key={schema.name} value={schema.name}>{schema.name}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.virtualNetwork && props.errors.ClusterDetails.virtualNetwork.message === "" &&
                <h6><span size="sm" className="text-danger">Select Virtual Network</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>

        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">AddressPrefix</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.addressPrefix" id="addressPrefix"
                     innerRef={props.register({required: true})}>
              <option value="">Select addressPrefix</option>
              {
                props.addressPrefix && props.addressPrefix.map((schema) => {
                  return (
                    <option key={schema} value={schema}>{schema}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.addressPrefix && props.errors.ClusterDetails.addressPrefix.message === "" &&
                <h6><span size="sm" className="text-danger">Select AddressPrefix</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>

        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">Subnets</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.subnets" id="subnets"
                     innerRef={props.register({required: true})}>
              <option value="">Select Subnets</option>
              {
                props.subnets && props.subnets.map((schema) => {
                  return (<option key={schema} value={schema}>{schema}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.subnets && props.errors.ClusterDetails.subnets.message === "" &&
                <h6><span size="sm" className="text-danger">Select subnets</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>
      </CCardBody>
    </>
  )
}

export default AzureWorkerDetails;
