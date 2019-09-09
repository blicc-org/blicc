import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LandingPage } from './pages/landing-page/LandingPage'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Wiki } from './pages/wiki/Wiki'
import { Dashboard } from './pages/dashboard/Dashboard'
import { NotFound } from './pages/not-found/NotFound'
import { ProtectedRoute } from './components/protected-route/ProtectedRoute'
import { AppProvider } from './helpers/context/AppContext'
import { ToastProvider } from './helpers/context/ToastContext'
import { ToastContainer } from './components/toast/ToastContainer'
import './App.scss'

export function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/wiki" component={Wiki} />
            <ProtectedRoute path="/dashboards" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <ToastContainer />
      </ToastProvider>
    </AppProvider>
  )
}
