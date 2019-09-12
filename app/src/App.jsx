import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LandingPage } from './pages/landing-page/LandingPage'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { PageGenerator } from './pages/page-generator/PageGenerator'
import { Dashboard } from './pages/dashboard/Dashboard'
import { NotFound } from './pages/not-found/NotFound'
import { ProtectedRoute } from './components/protected-route/ProtectedRoute'
import { AppProvider } from './context/AppContext'
import { ToastProvider } from './context/ToastContext'
import { ToastContainer } from './components/toast/ToastContainer'
import { ModalProvider } from './context/ModalContext'
import { Modal } from './components/modal/Modal'
import './App.scss'

export function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <ModalProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/pages" component={PageGenerator} />
              <ProtectedRoute path="/dashboards" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
            <Modal />
            <ToastContainer />
          </Router>
        </ModalProvider>
      </ToastProvider>
    </AppProvider>
  )
}
