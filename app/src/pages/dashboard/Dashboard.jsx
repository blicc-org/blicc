import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { DashboardHeader } from './DashboardHeader'
import { DashboardView } from '../../components/dashboard-view/DashboardView'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import { MetaData } from '../../components/meta-data/MetaData'

export function Dashboard({ match }) {
  const [dashboard, setDashboard] = useState({})
  const path = `/dashboards/${match.params.id}`
  const [, access, ,] = useApiEndpoint(path)
  const { title, data } = dashboard

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setDashboard(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  return (
    <>
      <MetaData title={title} description={title} path={path} />
      <div className="container-fluid">
        <DashboardHeader title={title} />
        <DashboardView data={data} />
      </div>
    </>
  )
}
