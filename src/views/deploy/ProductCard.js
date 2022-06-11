import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'
import ReactImg from 'src/assets/images/react.jpg'
import CIcon from '@coreui/icons-react'
import { cilBell, cilNoteAdd, cilPlus, cilPencil, cilDelete, cilX  } from '@coreui/icons'

const ProductCard = (props) => {
  console.log("--------", props)
  return (
     <CCol xs>
       <CCard>
          <CCardHeader className="ms-auto">
            <CNav variant="pills" className="card-header-pills md-end">
                <CNavItem>
                    <CNavLink>
                        <CIcon icon={cilPencil}/>
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink>
                        <CIcon icon={cilDelete}/> 
                    </CNavLink>
                </CNavItem>
            </CNav>
          </CCardHeader>
         <CCardImage orientation="top" src={ReactImg} />
         <CCardBody>
           <CCardTitle>Product: {props.data.product}</CCardTitle>
         </CCardBody>
         <CListGroup flush>
              <CListGroupItem>gitLoc: {props.data.gitLoc}</CListGroupItem>
              <CListGroupItem>clusterName: {props.data.clusterName}</CListGroupItem>
              <CListGroupItem>cloud: {props.data.cloud}</CListGroupItem>
            </CListGroup>
         <CCardFooter className="text-center">
            <CNav variant="pills" className="card-header-pills justify-content-md-center">
                <CNavItem>
                    <CNavLink active className="me-2 bg-success">
                        Healthy
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink active className="me-2 bg-warning">
                        Sync
                    </CNavLink>
                </CNavItem>
            </CNav>
         </CCardFooter>
       </CCard>
     </CCol>
  )
}

//product: "app1",
// gitLoc: "https://stefanprodan.github.io/podinfo",
// clusterName: "java-app-cluster",
// cloud: "aws",
// account: "account1",
// env: "qa",
// region: "us-west-2"

export default ProductCard
