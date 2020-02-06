import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NotFound } from './features/not-found/NotFound'
import { Offline } from './features/offline/Offline'
import { LandingPage } from './features/landing-page/LandingPage'
import { Login } from './features/login/Login'
import { Register } from './features/register/Register'
import { PageGenerator } from './features/page-generator/PageGenerator'
import { DashboardView } from './features/dashboard-view/DashboardView'
import { Dashboards } from './features/dashboards/Dashboards'
import { DataSourceView } from './features/data-source-view/DataSourceView'
import { DataSources } from './features/data-sources/DataSources'
import { Profile } from './features/profile/Profile'
import { Charts } from './features/charts/Charts'
import { ChartView } from './features/chart-view/ChartView'
import { TwoFactorAuth } from './features/two-factor-auth/TwoFactorAuth'
import { ProtectedRoute } from './common/components/protected-route/ProtectedRoute'
import { MobileNavigation } from './common/components/mobile-navigation/MobileNavigation'
import { Provider } from './common/context'
import { Header } from './common/components/header/Header'
import { Main } from './common/components/main/Main'
import { Installed } from './features/installed/Installed'
import './App.scss'

export function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <Main>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/installed" component={Installed} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/pages" component={PageGenerator} />
            <Route path="/offline" component={Offline} />
            <ProtectedRoute path="/charts/:id" component={ChartView} />
            <ProtectedRoute path="/charts" component={Charts} />
            <ProtectedRoute path="/dashboards/:id" component={DashboardView} />
            <ProtectedRoute path="/dashboards" component={Dashboards} />
            <ProtectedRoute path="/two-factor-auth" component={TwoFactorAuth} />
            <ProtectedRoute
              path="/data-sources/:id"
              component={DataSourceView}
            />
            <ProtectedRoute path="/data-sources" component={DataSources} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Main>
        <MobileNavigation />
      </Router>
    </Provider>
  )
}
