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
  CFormSelect
} from '@coreui/react'
import {useForm} from "react-hook-form";
import GroupedButtons from "../IncrDecrComp";
import * as constants from "../../../constants";
import TagsInput from "../TagsInput";


const defaultValues = {
  WorkerDetails: {minCount: '1', maxCount: '3'},
  machineType: "",
  name: "",
  labels: "",
  diskSizeGb: 100
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
    props.asg && props.asg.length > 0 && props.asg.forEach(function (item, i) {
      if (item.name === data.name) {
        found = true
        alert("ASG Name  [" + data.name + "] already present in the list")
        return false
      }
    })

    if (found === false) {
      let labels = getKeyVal(data.labels)
      //let taints = getKeyVal(data.taints)
      // let tags = getKeyVal(data.tags)

      let x = {
        minCount: Number(data.WorkerDetails.minCount),
        maxCount: Number(data.WorkerDetails.maxCount),
        //maxSurge: Number(data.WorkerDetails.maxSurge),
        machineType: data.machineType,
        name: data.name,
        labels: labels,
        diskSizeGb: Number(data.diskSizeGb),
      }
      props.setAsg([...props.asg, x]);
      props.setModalAsg(!props.modalAsg);
    }
  }
  return (
    <>
      <CModal size="lg" show={props.modalAsg} onClose={toggle} scrollable={true}>
        <CModalBody>
          <CCardBody>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">Name</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="form-control" type="text" name="name" placeholder="name"                       />
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
                    <div>Min<GroupedButtons name="minCount" initValue={1} register={register}/></div>
                  </CCol>
                  <CCol>
                    <div>Max<GroupedButtons name="maxCount" initValue={3} register={register}/></div>
                  </CCol>
                  {/*<CCol>*/}
                  {/*  <div>MaxSurge<GroupedButtons name="maxSurge" initValue={20} register={register}/></div>*/}
                  {/*  * always keep maxsurge as 20. (Will remove this field in future)*/}
                  {/*</CCol>*/}
                </CRow>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="select">MachineType</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CFormSelect className="form-control" name="machineType" innerRef={register}>
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
                <CFormLabel htmlFor="text-input">diskSizeGb</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="form-control" type="text" name="diskSizeGb" placeholder="diskSizeGb ex: 100"
                       />
                {/*<CRow>*/}
                {/*  {errors.diskSizeGb && errors.diskSizeGb?.message &&*/}
                {/*  <p className="text-danger">*/}
                {/*    {errors.diskSizeGb?.message}</p>}*/}
                {/*</CRow>*/}
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">NodeLabels (key:value)</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <TagsInput tags={[]} register={register} errors={errors} name={"labels"} keyValue={true}
                           required={false} placeholder={"enter as key:value and press enter"}/>
              </CCol>
            </CCardGroup>

          </CCardBody>
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
