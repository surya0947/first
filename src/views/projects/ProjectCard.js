import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const ProjectCard = (props) => {
  return (
    <CCard>
      <CCardHeader style={{ backgroundColor: '#37444f' }}>
        {/* eslint-disable-next-line react/prop-types */}
        {/*<div style={{ color: 'blue' }}>Product: {props.data.product}</div>*/}
      </CCardHeader>
      <CCardBody style={{ backgroundColor: 'whitespace' }}>
        <b>
          <div style={{ color: 'blue' }}>Product: {props.product}</div>
          <div style={{ color: 'green' }}>gitLoc: {props.gitLoc}</div>
          <div style={{ color: 'blue' }}>clusterName: {props.clusterName}</div>
          <div style={{ color: 'red' }}>cloud: {props.cloud}</div>
          <div style={{ color: 'blue' }}>account: {props.account}</div>
        </b>
      </CCardBody>
    </CCard>
  )
}

//product: "app1",
// gitLoc: "https://stefanprodan.github.io/podinfo",
// clusterName: "java-app-cluster",
// cloud: "aws",
// account: "account1",
// env: "qa",
// region: "us-west-2"

export default ProjectCard
