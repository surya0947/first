import React from 'react'
import {
  CButton,
  CCardBody,
  CCol,
  CCardGroup,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CFormSelect,
} from '@coreui/react'
import {useForm} from "react-hook-form";
import GroupedButtons from "../IncrDecrComp";
import * as constants from "../../../constants";
import TagsInput from "../TagsInput";
import {NAME_Validation_NotRequired} from "../../../constants";


const defaultValues = {
  WorkerDetails: {min: '1', max: '3', desired: '1'},
  instanceType: "",
  name: "",
  labels: "",
  taints: "",
  tags: "",
  workerIamRoleName: ""
};


function AwsAsg(props) {
  const {register, handleSubmit, errors} = useForm({defaultValues: defaultValues});

  const toggle = () => {
    props.setModalAsg(!props.modalAsg);
  }

  const getKeyVal = (keyVal) => {
    let json = {}
    if (keyVal !== "") {
      let arr1 = keyVal.split(",")
      arr1.forEach(function (arr, j) {
        let keyValue = arr.split(":")
        json[keyValue[0]] = keyValue[1]
      })
    }

    return json
  }

  const validate = (data) => {
    let found = false
    props.asg.length > 0 && props.asg.forEach(function (item, i) {
      if (item.name === data.name) {
        found = true
        alert("ASG Name  [" + data.name + "] already present in the list")
        return false
      }
    })

    if (found === false) {
      let labels = getKeyVal(data.labels)
      let taints = getKeyVal(data.taints)
      let tags = getKeyVal(data.tags)

      let x = {
        "name": data.name,
        "minSize": Number(data.WorkerDetails.min),
        "maxSize": Number(data.WorkerDetails.max),
        "desiredSize": Number(data.WorkerDetails.desired),
        "instanceType": data.instanceType,
        "taints": taints,
        "labels": labels,
        "tags": tags,
        "workerIamRoleName": data.workerIamRoleName,
      }
      props.setAsg([...props.asg, x]);
      props.setModalAsg(!props.modalAsg);
    }
  }
  return (
    <>
      <CModal size="lg" show={props.modalAsg} onClose={toggle} scrollable={true}>
        {/*<CModalHeader closeButton>Add Asg</CModalHeader>*/}
        <CModalBody>
          {/*<form action="" name={"asg"}>*/}
          <CCardBody>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">Name</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="form-control" type="text" name="name" placeholder="name"
                       />
                {/*<CRow>*/}
                {/*  {errors.name && errors.name?.message &&*/}
                {/*  <p className="text-danger">*/}
                {/*    {errors.name?.message}</p>}*/}
                {/*</CRow>*/}
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">ASG Size</CFormLabel>
              </CCol>
              <CCol>
                <CRow>
                  <CCol>
                    <div>Min<GroupedButtons name="min" initValue={1} register={register}/></div>
                  </CCol>
                  <CCol>
                    <div>Max<GroupedButtons name="max" initValue={3} register={register}/></div>
                  </CCol>
                  <CCol>
                    <div>Desired<GroupedButtons name="desired" initValue={1} register={register}/></div>
                  </CCol>
                </CRow>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="select">InstanceType</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CFormSelect className="form-control" name="instanceType" innerRef={register}>
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
                <CFormLabel htmlFor="text-input">Taints (key1=value1:NoSchedule)</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <TagsInput tags={[]} register={register} errors={errors} name={"taints"} keyValue={true}
                           required={false} placeholder={"enter as key1=value1:NoSchedule and press enter"}/>
                <CRow>
                  {/*{props.errors.WorkerDetails && props.errors.WorkerDetails.subnetsTagNameSearchString?.message &&*/}
                  {/*<p className="text-danger">*/}
                  {/*  {props.errors.WorkerDetails.subnetsTagNameSearchString?.message}</p>}*/}
                </CRow>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">NodeLabels (key:value)</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <TagsInput tags={[]} register={register} errors={errors} name={"labels"} keyValue={true}
                           required={false} placeholder={"enter as key:value and press enter"}/>
                <CRow>
                  {/*{props.errors.WorkerDetails && props.errors.WorkerDetails.subnetsTagNameSearchString?.message &&*/}
                  {/*<p className="text-danger">*/}
                  {/*  {props.errors.WorkerDetails.subnetsTagNameSearchString?.message}</p>}*/}
                </CRow>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">Tags (key:value)</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <TagsInput tags={[]} register={register} errors={errors} name={"tags"} keyValue={true}
                           required={false} placeholder={"enter as key:value and press enter"}/>
                <CRow>
                </CRow>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">(WorkerIamRoleName)</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="form-control" type="text" name="workerIamRoleName" placeholder="workerIamRoleName"
                       />
                {/*<CRow>*/}
                {/*  {errors.workerIamRoleName && errors.workerIamRoleName?.message &&*/}
                {/*    <p className="text-danger">*/}
                {/*      {errors.workerIamRoleName?.message}</p>}*/}
                {/*</CRow>*/}
              </CCol>
            </CCardGroup>
          </CCardBody>
          {/*</form>*/}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit(validate)}>Add</CButton>
          <CButton color="secondary" onClick={toggle}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  )

}

export default AwsAsg
