import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NotFound } from './pages/not-found/NotFound'
import { Offline } from './pages/offline/Offline'
import { LandingPage } from './pages/landing-page/LandingPage'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { PageGenerator } from './pages/page-generator/PageGenerator'
import { WebSocketTest } from './pages/websocket-test/WebSocketTest'
import { DashboardsId } from './pages/dashboards-id/DashboardsId'
import { Dashboards } from './pages/dashboards/Dashboards'
import { Profile } from './pages/profile/Profile'
import { TwoFactorAuth } from './pages/two-factor-auth/TwoFactorAuth'
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
            <ProtectedRoute path="/dashboards/:id" component={DashboardsId} />
            <ProtectedRoute path="/dashboards" component={Dashboards} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Main>
        <Modal />
        <ToastContainer />
      </Router>
    </Provider>
  )
}
