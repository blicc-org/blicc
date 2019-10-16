import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NotFound } from './pages/fallback/not-found/NotFound'
import { Offline } from './pages/fallback/offline/Offline'
import { LandingPage } from './pages/open/landing-page/LandingPage'
import { Login } from './pages/open/login/Login'
import { Register } from './pages/open/register/Register'
import { PageGenerator } from './pages/open/page-generator/PageGenerator'
import { Dashboard } from './pages/protected/dashboard/Dashboard'
import { Profile } from './pages/protected/profile/Profile'
import { TwoFactorAuth } from './pages/protected/two-factor-auth/TwoFactorAuth'
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
            <ProtectedRoute path="/two-factor-auth" component={TwoFactorAuth} />
            <ProtectedRoute path="/dashboards" component={Dashboard} />
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
