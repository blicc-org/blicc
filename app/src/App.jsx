import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NotFound } from './features/not-found/NotFound'
import { Offline } from './features/offline/Offline'
import { LandingPage } from './features/landing-page/LandingPage'
import { Login } from './features/login/Login'
import { Register } from './features/register/Register'
import { PageGenerator } from './features/page-generator/PageGenerator'
import { WebSocketTest } from './features/websocket-test/WebSocketTest'
import { Dashboard } from './features/single-dashboard/Dashboard'
import { DataSources } from './features/data-sources/DataSources'
import { Dashboards } from './features/dashboards/Dashboards'
import { Profile } from './features/profile/Profile'
import { Charts } from './features/charts/Charts'
import { TwoFactorAuth } from './features/two-factor-auth/TwoFactorAuth'
import { ProtectedRoute } from './common/components/protected-route/ProtectedRoute'
import { ToastContainer } from './common/components/toast/ToastContainer'
import { Provider } from './common/context'
import { Modal } from './common/components/modal/Modal'
import { Header } from './common/components/header/Header'
import { Main } from './common/components/main/Main'
import './App.scss'

export function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <Main>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/pages" component={PageGenerator} />
            <Route path="/offline" component={Offline} />
            <Route path="/websocket-test" component={WebSocketTest} />
            <ProtectedRoute path="/two-factor-auth" component={TwoFactorAuth} />
            <ProtectedRoute path="/dashboards/:id" component={Dashboard} />
            <ProtectedRoute path="/dashboards" component={Dashboards} />
            <ProtectedRoute path="/data-sources" component={DataSources} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/charts" component={Charts} />
            <Route component={NotFound} />
          </Switch>
        </Main>
        <Modal />
        <ToastContainer />
      </Router>
    </Provider>
  )
}
