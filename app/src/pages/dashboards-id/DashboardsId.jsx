import React, { useEffect } from 'react'
import statusCode from 'http-status-codes'
import { DashboardsIdHeader } from './DashboardsIdHeader'
import { DashboardView } from '../../components/dashboard-view/DashboardView'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import { useDashboard } from '../../hooks/useDashboard'
import { MetaData } from '../../components/meta-data/MetaData'

export function DashboardsId({ match }) {
  const [dashboard, setData, setDashboard] = useDashboard()
  const path = `/dashboards/${match.params.id}`
  const [, access, update] = useApiEndpoint(path)
  const { title } = dashboard

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

  async function updateDashboard() {
    const [status] = await update(dashboard)
    if (status === statusCode.OK) {
      console.log('update was successful!')
    }
  }

  return (
    <>
      <MetaData title={title} description={title} path={path} />
      <div className="container-fluid">
        <DashboardsIdHeader title={title} onSave={updateDashboard} />
        <DashboardView dashboard={dashboard} update={setData} />
      </div>
    </>
  )
}
