import React from 'react'
import { DashboardPageHeader } from './DashboardPageHeader'
import { Dashboard } from '../../components/dashboard/Dashboard'

export function DashboardPage() {
  return (
    <div className="container-fluid">
      <DashboardPageHeader />
      <Dashboard />
    </div>
  )
}
