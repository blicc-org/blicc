import React from 'react'
import { LineChart } from '../../components/charts/Linechart'
import { Table } from '../../components/charts/Table'
import { DashboardHeader } from './DashboardHeader'
import { Header } from '../../components/header/Header'

export function Dashboard() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <main className="col px-4">
          <DashboardHeader />
          <LineChart />
          <Table />
        </main>
      </div>
    </>
  )
}
