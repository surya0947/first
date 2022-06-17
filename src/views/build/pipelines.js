import React, {Component} from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

export default class pipelines extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataIsLoaded: false,
      items: [],
    }
  }

  componentDidMount() {
   fetch('apis/tekton.dev/v1beta1/pipelines/')
    .then((response) => response.json())
    .then((jResponse) => {
      this.prepareDashBoardData(jResponse)
    })
  }

  prepareDashBoardData(pipeLines) {
    const pipelineMetadata = []
    Object.keys(pipeLines).map((key, index) => {
      if (key == "items" && Object.keys(pipeLines[key]).length >= 0) {
        pipeLines[key].map(data => {
          console.log(data.metadata.name)
          let days = (Math.ceil((new Date().getTime() - new Date(data.metadata.creationTimestamp).getTime()) / 86400000))
          pipelineMetadata.push({'name':data.metadata.name, 
                                 'namespace': data.metadata.namespace, 
                                 'createdTime': days+' days ago'})
        })
        this.setState({
          items: pipelineMetadata,
          dataIsLoaded: true
        })
      }
    })
  }

  render() {
    const {dataIsLoaded, items} = this.state
    if(!dataIsLoaded) return <h1>Please wait for the Pipelines to load</h1>
    return (
      <div className="pipelines">
         <CTable>
          <CTableHead>
            <CTableRow color="primary">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Namespace</CTableHeaderCell>
              <CTableHeaderCell scope="col">Created</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item, index) => (  
              <CTableRow color="Info" key={index}>
                <CTableDataCell>{index+1}</CTableDataCell>
                <CTableHeaderCell scope="row">{item.name}</CTableHeaderCell>
                <CTableDataCell>{item.namespace}</CTableDataCell>
                <CTableDataCell>{item.createdTime}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    )
  }
}