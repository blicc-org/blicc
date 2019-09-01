import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LandingPage } from './pages/landing-page/LandingPage'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/dashboard/Dashboard'
import { NotFound } from './pages/not-found/NotFound'
import { AppProvider } from './common/context/AppContext'
import { ToastProvider } from './common/context/ToastContext'
import { ToastContainer } from './components/toast/ToastContainer'
import { content } from './Content'
import './App.scss'

export function App() {
  return (
    <AppProvider value={content}>
      <ToastProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ToastProvider>
    </AppProvider>
  )
}
