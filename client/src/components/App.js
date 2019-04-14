import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// MobX
import { inject, observer } from 'mobx-react'

// Pages
import { Mainpage, Authpage } from 'pages'

@inject('auth')
@observer
class App extends Component {
  componentDidMount() {
    this.props.auth.isLoggedIn()
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Mainpage} />
        <Route path="/auth/:mode" component={Authpage} />
      </Switch>
    )
  }
}

export default App