import React from 'react'
import { DashboardPageHeader } from './DashboardPageHeader'
import { Dashboard } from '../../components/dashboard/Dashboard'

export function DashboardPage() {
  return (
    <div className="container-fluid">
      <main className="dashboard-page">
        <DashboardPageHeader />
        <Dashboard />
      </main>
    </div>
  )
}
