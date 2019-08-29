import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './pages/landing-page/LandingPage'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Dashboard from './pages/dashboard/Dashboard'
import NotFound from './pages/not-found/NotFound'
import { Provider } from './AppContext'
import content from './Content'
import './App.scss'

export default function App() {
  return (
    <Provider value={content}>
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  )
}
