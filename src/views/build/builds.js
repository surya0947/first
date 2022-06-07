import React, { Component } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CAccordion,
//   CAccordionBody,
//   CAccordionHeader,
//   CAccordionItem,
// } from '@coreui/react'
// import Table from '../base/tables/Tables'
// import { DocsCallout, DocsExample } from 'src/components'

// const Builds = () => {
//   return (
//     <div>
//       <h1>Hello</h1>
//       <h2>test</h2>
//     </div>
//   )
// }

// export default Builds

class Car extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      DataisLoaded: false,
      items: [],
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        })
      })
  }

  render() {
    const { DataisLoaded, items } = this.state
    if (!DataisLoaded) return <div>{this.test()}</div>
    return (
      <div className="Car">
        <h1> Fetch data from an api in react </h1>
        {items.map((item) => (
          <ol key={item.id}>
            User_Name: {item.username}, Full_Name: {item.name}, User_Email: {item.email}
          </ol>
        ))}
      </div>
    )
  }

  test() {
    return <h2>Hi, Please wait some time!</h2>
  }
}

export default Car
