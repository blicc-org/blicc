import React from 'react'
import { LineChart } from '../../../components/charts/Linechart'
import { Table } from '../../../components/charts/Table'
import { DashboardHeader } from './DashboardHeader'

export function Dashboard() {
  return (
    <div className="container-fluid">
      <main className="col p-0 m-0">
        <DashboardHeader />
        <LineChart />
        <Table />
      </main>
    </div>
  )
}
