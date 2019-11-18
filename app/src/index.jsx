import './assets/scss/Bootstrap.scss'
import './assets/js/string-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { registerServiceWorker } from './register'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
