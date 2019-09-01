import './assets/scss/Bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.min.js'

import io from 'socket.io-client'

import React from 'react'
import ReactDOM from 'react-dom'

import { API_URL } from './config'
import { App } from './App'

const socket = io(API_URL)
socket.on('broadcast', data => {
  console.log(`${data.label} - ${data.message}`)
})

function send(data) {
  socket.emit('broadcast', data)
}

ReactDOM.render(<App send={send} />, document.getElementById('root'))
