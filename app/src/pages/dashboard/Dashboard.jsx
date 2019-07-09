import React from 'react'
import LineChart from '../../components/charts/Linechart'
import Sidebar from '../../components/sidebar/Sidebar'
import Table from '../../components/charts/Table'
import DashboardHeader from './DashboardHeader'
import Header from '../../components/header/Header'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="moveUnderNavBar" />
      <div className="container-fluid">
        <Sidebar />
        <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <DashboardHeader />
          <LineChart />
          <Table />
        </main>
      </div>
    </>
  )
}
