import React, {useState} from 'react';
import {CButton, CCardBody, CCol, CCardGroup, CFormInput, CFormCheck, CFormLabel, CRow, CFormSelect} from "@coreui/react";
import * as constants from "../../../constants"
import AwsAsg from "./AwsAsg";
import Rjv from "react-json-tree-viewer";

const AwsWorkerDetails = (props, {register}) => {
  const [cgNatSubnetTagNameSearchStringDisable, setCgNatSubnetTagNameSearchStringDisable] = useState(true)
  const [modalAsg, setModalAsg] = useState(false);

  const oncgNatChange = (event) => {
    setCgNatSubnetTagNameSearchStringDisable(!cgNatSubnetTagNameSearchStringDisable)
  }

  const validateAndOpenPopup = (data) => {
    setModalAsg(!modalAsg)
  }

  const clearASGs = () => {
    props.setAsg([])
  }

  return (
    <>
      <CCardBody>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel>CgNat</CFormLabel>
          </CCol>
          <CCol md="9">
            <CCardGroup variant="custom-radio" inline>
              <CFormCheck custom id="cgNatEnabled1" name="WorkerDetails.cgNatEnabled" value={true}
                           onChange={oncgNatChange} innerRef={props.register}/>
              <CFormLabel variant="custom-checkbox" htmlFor="cgNatEnabled1">Enable</CFormLabel>
            </CCardGroup>
            <CCardGroup variant="custom-radio" inline>
              <CFormCheck custom id="cgNatEnabled2" name="WorkerDetails.cgNatEnabled" value={false}
                           onChange={oncgNatChange} innerRef={props.register} defaultChecked/>
              <CFormLabel variant="custom-checkbox" htmlFor="cgNatEnabled2">Disable</CFormLabel>
            </CCardGroup>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="text-input">CgNatSubnetTagNameSearchString</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormInput name="WorkerDetails.cgNatSubnetTagNameSearchString"
                    placeholder="cgNatSubnetTagNameSearchString"
                    // innerRef={props.register({
                    //   required: !cgNatSubnetTagNameSearchStringDisable,
                    //   pattern: {
                    //     value: /^[A-Z0-9._*-]{4,}$/i,
                    //     message: "Entered value does not match format. Only [A-Z0-9._*-] are allowed. Mininum 2 characters."
                    //   }
                    // })}
                    disabled={cgNatSubnetTagNameSearchStringDisable}/>
            {/*<CRow>*/}
            {/*  {props.errors.WorkerDetails && props.errors.WorkerDetails.cgNatSubnetTagNameSearchString?.message &&*/}
            {/*  <p className="text-danger">*/}
            {/*    {props.errors.WorkerDetails.cgNatSubnetTagNameSearchString?.message}</p>}*/}
            {/*</CRow>*/}
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="text-input">subnetsTagNameSearchString</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormInput name="WorkerDetails.subnetsTagNameSearchString"
                    placeholder="subnetsTagNameSearchString"
                    />
            {/*<CRow>*/}
            {/*  {props.errors.WorkerDetails && props.errors.WorkerDetails.subnetsTagNameSearchString?.message &&*/}
            {/*  <p className="text-danger">*/}
            {/*    {props.errors.WorkerDetails.subnetsTagNameSearchString?.message}</p>}*/}
            {/*</CRow>*/}
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">mgmtVpcCidrs</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CFormSelect className="form-control" name="WorkerDetails.mgmtVpcCidrs" id="mgmtVpcCidrs"
                     innerRef={props.register}>
              {
                props.mgmtVpcCidrs && props.mgmtVpcCidrs.map((schema) => {
                  return (<option key={schema} value={schema.cidrs}>{schema.name}</option>);
                })
              }
            </CFormSelect>
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="select">VpcTagNameSearchString</CFormLabel>
          </CCol>
          <CCol xs="12" md="9">
            <input className="form-control" type="text" name="WorkerDetails.vpcTagNameSearchString"
                   placeholder="Search string"
                   />
            {/*<CRow>*/}
            {/*  {props.errors.WorkerDetails && props.errors.WorkerDetails.vpcTagNameSearchString?.message &&*/}
            {/*  <p className="text-danger">*/}
            {/*    {props.errors.WorkerDetails.vpcTagNameSearchString?.message}</p>}*/}
            {/*</CRow>*/}
          </CCol>
        </CCardGroup>
        <CCardGroup row>
          <CCol md="3">
            <CFormLabel htmlFor="text-input">ASG</CFormLabel>
          </CCol>

          <CCol xs="12" md="9">
            <input className="form-control" type="hidden" name="WorkerDetails.asg" value={JSON.stringify(props.asg)}
                   placeholder="Name"
                   />

            {/*<input className="form-control" type="text" name="WorkerDetails.asg"  ref={props.register({required: true})}/>*/}
            <CButton type="button" size="sm" color="primary" onClick={validateAndOpenPopup}>AddASG</CButton> &nbsp;
            <CButton type="button" size="sm" color="primary" onClick={clearASGs}>Clear</CButton>
            <AwsAsg asg={props.asg} setAsg={props.setAsg} modalAsg={modalAsg} setModalAsg={setModalAsg}
                    instanceType={props.webConfig.instanceType}/>

            <Rjv data={props.asg} hideRoot={true}/>
          </CCol>

          {/*<CRow>*/}
          {/*  {props.errors.WorkerDetails && props.errors.WorkerDetails.asg?.message &&*/}
          {/*  <p className="text-danger">{props.errors.WorkerDetails.asg?.message}</p>}*/}
          {/*</CRow>*/}
        </CCardGroup>
      </CCardBody>
    </>
  )
}

export default AwsWorkerDetails;
