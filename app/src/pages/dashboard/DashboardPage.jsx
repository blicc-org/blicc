import React from 'react'
// import { DashboardPageHeader } from './DashboardPageHeader'
// import { Dashboard } from '../../components/dashboard/Dashboard'
import { MetaData } from '../../components/meta-data/MetaData'
import { ListDashboards } from './ListDashboards'

export function DashboardPage() {
  const title = 'Dashboards'
  const description = 'View and edit your dashboards.'
  const path = '/dashboards'
  return (
    <>
      {/* <MetaData title={title} description={description} path={path} />
      <div className="container-fluid">
        <DashboardPageHeader />
        <Dashboard />
      </div> */}

      <MetaData title={title} description={description} path={path} />
      <div className="container-fluid">
        <ListDashboards />
      </div>
    </>
  )
}
