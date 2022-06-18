import React, { Component } from 'react'
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
import CIcon from '@coreui/icons-react'
import ReactImg from 'src/assets/images/react.jpg'
import { cilBell, cilNoteAdd, cilPlus, cilPencil, cilDelete, cilX  } from '@coreui/icons'

class Environment extends React.Component {
  render() {
    return (
      <div className="environments">
        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
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
                            <CIcon icon={cilX}/> 
                        </CNavLink>
                    </CNavItem>
                </CNav>
                </CCardHeader>
              <CCardImage orientation="top" src={ReactImg} />
              <CCardBody>
                <CCardTitle>Environment 1</CCardTitle>
                <CCardText>
                  Some quick example text to build on the card title and make up the bulk of the
                  card&#39;s content.
                </CCardText>
              </CCardBody>
              <CCardFooter>
                <small className="text-medium-emphasis">Last updated 3 mins ago</small>
              </CCardFooter>
            </CCard>
          </CCol>
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
                            <CIcon icon={cilX}/> 
                        </CNavLink>
                    </CNavItem>
                </CNav>
                </CCardHeader>
              <CCardImage orientation="top" src={ReactImg} />
              <CCardBody>
                <CCardTitle>Environment 2</CCardTitle>
                <CCardText>
                  Some quick example text to build on the card title and make up the bulk of the
                  card&#39;s content.
                </CCardText>
              </CCardBody>
              <CCardFooter>
                 <small className="text-medium-emphasis">Last updated 3 mins ago</small>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}

export default Environment
