import React, {useState} from 'react'
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
import TagsInput from "../TagsInput";


const defaultValues = {
  be: "",
  bu: "",
  namespace: "",
};

function GCPBEConfig(props) {
  const [businessUnitOwner, setBusinessUnitOwner] = useState([]);
  const {register, handleSubmit, errors} = useForm({defaultValues: defaultValues});

  const toggle = () => {
    props.setModalConfig(!props.modalConfig);
  }

  const onBusinessEntityOwnerChange = (event) => {
    props.beList.map((item) => {
      if (event.target.value === "") {
        setBusinessUnitOwner([])
      } else if (item.name === event.target.value) {
        setBusinessUnitOwner(item.BU)
      }
      return "";
    })
  }

  const getArray = (str) => {
    let arr = []
    if (str !== "") {
      let arr1 = str.split(",")
      arr1.forEach(function (a, j) {
        arr.push(a)
      })
    }

    return arr
  }

  const validate = (data) => {
    let found = false
    // props.beConfig.length > 0 && props.beConfig.forEach(function (item, i) {
    //   if (item.be === data.be && item.bu === data.bu) {
    //     found = true
    //     alert("Config  [" + data.be + "] already present in the list")
    //     return false
    //   }
    // })

    if (found === false) {
      let ns = getArray(data.namespace)
      let gcpGroupSA = getArray(data.gcpGroupSA)
      let mgmtNodeSA = getArray(data.mgmtNodeSA)

      let x = {
        be: data.be,
        bu: data.bu,
        gcpGroupSA: gcpGroupSA,
        mgmtNodeSA: mgmtNodeSA,
        namespace: ns,
      }
      props.setBeConfig([...props.beConfig, x]);
      props.setModalConfig(!props.modalConfig);
    }
  }
  return (
    <>
      <CModal size="lg" show={props.modalConfig} onClose={toggle} scrollable={true}>
        <CModalBody>
          {/*<form action="" name={"beConfig"}>*/}
          <CCardBody>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="select">BusinessEntityOwner</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CFormSelect className="form-control" name="be" innerRef={register({required: true})}
                         onChange={onBusinessEntityOwnerChange}>
                  <option value="">Select BusinessEntityOwner</option>
                  {
                    (props.beList && props.beList.length > 0) &&
                    props.beList.map((schema) => {
                      return (<option key={schema.name} value={schema.name}>{schema.name}</option>);
                    })
                  }
                </CFormSelect>

                <CRow>
                  {errors.Blueprint && errors.Blueprint.businessEntityOwner && errors.Blueprint.businessEntityOwner.message === "" &&
                  <h6><span size="sm" className="text-danger">Select BusinessEntityOwner</span></h6>}
                </CRow>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="select">BusinessUnitOwner</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CFormSelect className="form-control" name="bu" innerRef={register({required: true})}>
                  <option value="">Select BusinessUnitOwner</option>
                  {
                    (businessUnitOwner.length > 0) && businessUnitOwner.map((schema) => {
                      return (<option key={schema} value={schema}>{schema}</option>);
                    })
                  }
                </CFormSelect>
                <CRow>
                  {errors.Blueprint && errors.Blueprint.businessUnitOwner && errors.Blueprint.businessUnitOwner.message === "" &&
                  <h6><span size="sm" className="text-danger">Select BusinessUnitOwner</span></h6>}
                </CRow>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">gcpGroupSA</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <TagsInput tags={[]} register={register} errors={errors} name={"gcpGroupSA"} keyValue={false}
                           required={true} placeholder={"enter as email and press enter"}/>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">mgmtNodeSA</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <TagsInput tags={[]} register={register} errors={errors} name={"mgmtNodeSA"} keyValue={false}
                           required={true} placeholder={"enter as email and press enter"}/>
              </CCol>
            </CCardGroup>
            <CCardGroup row>
              <CCol md="3">
                <CFormLabel htmlFor="text-input">Namespaces</CFormLabel>
              </CCol>
              <CCol xs="12" md="9">
                <TagsInput tags={[]} register={register} errors={errors} name={"namespace"} keyValue={false}
                           required={true} placeholder={"enter as namespace string and press enter"}/>
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

export default GCPBEConfig
