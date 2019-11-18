import './assets/scss/Bootstrap.scss'
import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { registerServiceWorker } from './register'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
