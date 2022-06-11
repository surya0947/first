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
import ReactImg from 'src/assets/images/react.jpg'

class Environment extends React.Component {
  render() {
    return (
      <div className="environments">
        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
          <CCol xs>
            <CCard>
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
