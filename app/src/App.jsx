import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NotFound } from './pages/not-found/NotFound'
import { Offline } from './pages/not-found/Offline'
import { LandingPage } from './pages/landing-page/LandingPage'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { PageGenerator } from './pages/page-generator/PageGenerator'
import { WebSocketTest } from './pages/websocket-test/WebSocketTest'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { Profile } from './pages/profile/Profile'
import { TwoFactorAuth } from './pages/two-factor-auth/TwoFactorAuth'
import { ProtectedRoute } from './components/protected-route/ProtectedRoute'
import { ToastContainer } from './components/toast/ToastContainer'
import { Provider } from './context/Provider'
import { Modal } from './components/modal/Modal'
import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'

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
            <Route path="/test" component={WebSocketTest} />
            <ProtectedRoute path="/two-factor-auth" component={TwoFactorAuth} />
            <ProtectedRoute path="/dashboards" component={DashboardPage} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Main>
        <Footer />
        <Modal />
        <ToastContainer />
      </Router>
    </Provider>
  )
}
