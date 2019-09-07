import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LandingPage } from './pages/landing-page/LandingPage'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/dashboard/Dashboard'
import { NotFound } from './pages/not-found/NotFound'
import { AppProvider } from './common/context/AppContext'
import { ToastProvider } from './common/context/ToastContext'
import { INITIAL_APP_STATE } from './common/context/AppContext'
import './App.scss'

export function App() {
  const [appState, setAppState] = useState(INITIAL_APP_STATE)

  return (
    <AppProvider value={[appState, setAppState]}>
      <ToastProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboards" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ToastProvider>
    </AppProvider>
  )
}
