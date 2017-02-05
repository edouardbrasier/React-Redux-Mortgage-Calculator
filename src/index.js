import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import{ createStore}  from 'redux'
import { Provider } from 'react-redux'

import Main from './containers/Main_Container'
import reducer from './reducers/All_Reducers'

const store = createStore(reducer);

const rootEl = document.getElementById('root')
const render = () => ReactDOM.render(
  <Provider store={store}>
  <Main />
  </Provider>,
  rootEl
)

render()
store.subscribe(render)
