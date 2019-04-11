import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'styles/base.scss'

import App from 'components/App'

// MobX State Management
import { Provider } from 'mobx-react'
import RootStore from 'stores'

const root = new RootStore()

ReactDOM.render(
  <Provider {...root}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)