import './assets/scss/Bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.min.js'

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

import * as serviceWorker from './serviceWorker'

import { DELIVERY_URL } from './config'

let socket = new WebSocket(DELIVERY_URL)

console.log('waiting for websocket connection')
socket.onopen = () => {
  socket.send('Hi from client')

  socket.onmessage = ({ data }) => {
    console.log(`Socket received message: ${data}`)
  }

  socket.onclose = event => {
    console.log(`Socket closed connection: ${event}`)
  }

  socket.onerror = event => {
    console.log(`Socket error occured: ${event}`)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()
