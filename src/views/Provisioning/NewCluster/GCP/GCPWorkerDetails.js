import React, {useState} from 'react';
import {CButton, CCardBody, CCol, CCardGroup, CFormInput, CFormLabel, CRow, CFormSelect} from "@coreui/react";
import GcpAsg from "../GCP/GCPAsg";
import Rjv from "react-json-tree-viewer";

const GCPWorkerDetails = (props, {register}) => {
  const [modalAsg, setModalAsg] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [subnetworks, setSubnetworks] = useState([]);
  const [secondaryIPranges, setSecondaryIPranges] = useState([]);

  const validateAndOpenPopup = (data) => {
    setModalAsg(!modalAsg)
  }

  const clearASGs = () => {
    props.setAsg([])
  }

  const onNetworkChange = (event) => {
    if (!event.target.value)
      return
    let ftemp = JSON.parse(event.target.value);
    setSubnetworks([])
    setSecondaryIPranges([])
    let subnets = []
    ftemp.subnets && ftemp.subnets.length > 0 && ftemp.subnets.forEach(function (p, i) {
      subnets.push(p)
    })
    setSelectedNetwork(ftemp.name)
    setSubnetworks(subnets)
  }

  const onSubnetworkChange = (event) => {
    if (!event.target.value)
      return
    setSecondaryIPranges([])
    subnetworks && subnetworks.forEach(function (a, i) {
      if (event.target.value === a.name) {
        setSecondaryIPranges(a.secondaryIPranges)
      }
    });
  }

  return (
    <>
      <CCardBody>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">network VPCs</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <input type={"hidden"} name="ClusterDetails.network" value={selectedNetwork} ref={props.register()}/>
            <CFormSelect className="form-control" name="ClusterDetails.network1" id="ClusterDetails.network1"
                     onChange={onNetworkChange}
                     innerRef={props.register({required: true})}>
              <option value="">Select Network</option>
              {
                (props.networks && props.networks.vpcs && props.networks.vpcs.length > 0) && props.networks.vpcs.map((schema, i) => {
                  return (<option key={schema.name} value={JSON.stringify(schema)}>{schema.name}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.network1 && props.errors.ClusterDetails.network1.type === "required" &&
              <h6><span size="sm" className="text-danger">Select network</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">subnetwork</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.subnetwork" id="ClusterDetails.subnetwork"
                     onChange={onSubnetworkChange}
                     innerRef={props.register({required: true})}>
              <option value="">Select Network</option>
              {
                (subnetworks && subnetworks.length > 0) && subnetworks.map((schema) => {
                  return (<option key={schema.name} value={schema.name}>{schema.name}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.subnetwork && props.errors.ClusterDetails.subnetwork.type === "required" &&
              <h6><span size="sm" className="text-danger">Select subnetworks</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">gkePodNetwork</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.podSubnetName" id="ClusterDetails.podSubnetName"
                     innerRef={props.register({required: true})}>
              <option value="">Select podSubnetName</option>
              {
                (secondaryIPranges && secondaryIPranges.length > 0) && secondaryIPranges.map((schema) => {
                  return (<option key={schema} value={schema}>{schema}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.podSubnetName && props.errors.ClusterDetails.podSubnetName.type === "required" &&
              <h6><span size="sm" className="text-danger">Select podSubnetName</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>

        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">gkeserviceNetwork</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="ClusterDetails.serviceSubnetName"
                     id="ClusterDetails.serviceSubnetName"
                     innerRef={props.register({required: true})}>
              <option value="">Select serviceSubnetName</option>
              {
                (secondaryIPranges && secondaryIPranges.length > 0) && secondaryIPranges.map((schema) => {
                  return (<option key={schema} value={schema}>{schema}</option>);
                })
              }
            </CFormSelect>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.serviceSubnetName && props.errors.ClusterDetails.serviceSubnetName.type === "required" &&
              <h6><span size="sm" className="text-danger">Select serviceSubnetName</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">masterIpv4CidrBlock</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormInput className="form-control" name="ClusterDetails.masterIpv4CidrBlock"
                    id="ClusterDetails.masterIpv4CidrBlock" placeholder={"ex: 10.224.240.128/28"}
                    innerRef={props.register({required: true})}>
            </CFormInput>
            <CRow>
              {props.errors.ClusterDetails && props.errors.ClusterDetails.masterIpv4CidrBlock && props.errors.ClusterDetails.masterIpv4CidrBlock.type === "required" &&
              <h6><span size="sm" className="text-danger">Select masterIpv4CidrBlock</span></h6>}
            </CRow>
          </CCol>
        </CCardGroup>

        {/*<CCardGroup row>*/}
        {/*  <CCol md="3">*/}
        {/*    <CFormLabel htmlFor="select">networkTags</CFormLabel>*/}
        {/*  </CCol>*/}
        {/*  <CCol xs="12" md="9">*/}
        {/*    <TagsInput tags={[]} register={props.register} errors={props.errors} required={false}*/}
        {/*               name="WorkerDetails.networkTags"*/}
        {/*               placeholder="networkTags"/>*/}
        {/*  </CCol>*/}
        {/*</CCardGroup>*/}


        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="text-input">ASG</CFormLabel>
          </CCol>

          <CCol xs="12" md="9">
            <input className="form-control" type="hidden" name="WorkerDetails.asg" value={JSON.stringify(props.asg)}
                   placeholder="Name"
                   ref={props.register({required: "Atleast one ASG should be present"})}/>
            <CButton type="button" size="sm" color="primary" onClick={validateAndOpenPopup}>AddASG</CButton> &nbsp;
            <CButton type="button" size="sm" color="primary" onClick={clearASGs}>Clear</CButton>
            <GcpAsg asg={props.asg} setAsg={props.setAsg} modalAsg={modalAsg} setModalAsg={setModalAsg}
                    instanceType={props.webConfig.instanceType}/>

            <Rjv data={props.asg} hideRoot={true}/>
          </CCol>
          <CRow>
            {props.errors.WorkerDetails && props.errors.WorkerDetails.asg?.message &&
            <p className="text-danger">{props.errors.WorkerDetails.asg?.message}</p>}
          </CRow>
        </CCardGroup>
      </CCardBody>
    </>
  )
}

export default GCPWorkerDetails;
