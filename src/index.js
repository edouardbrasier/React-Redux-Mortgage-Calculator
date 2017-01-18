import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//import { createAction } from 'redux-actions'
import{ createStore}  from 'redux'
import { Provider } from 'react-redux'

import Main from './containers/main'
import reducer from './reducers/allreducers'
//maybe use that https://cdn.rawgit.com/hongymagic/react-number-input/master/demos/demo0/index.html

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

// //Now you can access the store from window.store in the console like this:
// window.store = store;
// window.store.dispatch({ type: 'PRINCIPAL_CHANGE', payload: 123456 })
