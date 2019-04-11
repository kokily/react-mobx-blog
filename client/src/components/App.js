import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { MainPage } from 'pages'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    )
  }
}

export default App