import React from 'react'
import { DashboardPageHeader } from './DashboardPageHeader'
import { Dashboard } from '../../components/dashboard/Dashboard'

export function DashboardPage() {
  return (
    <div className="container-fluid">
      <main className="col p-0 m-0">
        <DashboardPageHeader />
        <Dashboard />
      </main>
    </div>
  )
}
