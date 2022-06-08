import React, { Component } from 'react'
import WelcomeWidgetsDropdown from '../widgets/WelcomeWidgets'

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h1>Welcome Jennifer</h1>
        <WelcomeWidgetsDropdown />
      </div>
    )
  }
}

export default Home
