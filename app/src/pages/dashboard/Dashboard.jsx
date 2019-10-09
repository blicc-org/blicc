import React from 'react'
import { LineChart } from '../../components/charts/Linechart'
import { Table } from '../../components/charts/Table'
import { DashboardHeader } from './DashboardHeader'
import { useDeliveryEndpoint } from '../../hooks/useDeliveryEndpoint'

export function Dashboard() {
  const [a, b] = useDeliveryEndpoint()

  return (
    <>
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
