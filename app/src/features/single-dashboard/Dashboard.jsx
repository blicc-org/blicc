import React, { useEffect } from 'react'
import statusCode from 'http-status-codes'
import { DashboardHeader } from './DashboardHeader'
import { DashboardView } from '../../common/components/dashboard-view/DashboardView'
import { useApiEndpoint, useDashboard } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'

export function Dashboard({ match }) {
  const [data, setData, setDashboard] = useDashboard()
  const path = `/dashboards/${match.params.id}`
  const [, access, update] = useApiEndpoint(path)
  const { title } = data

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setData(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  async function updateDashboard() {
    const [status] = await update(data)
    if (status === statusCode.OK) {
      console.log('update was successful!')
    }
  }

  return (
    <>
      <MetaData title={title} description={title} path={path} />
      <div className="container-fluid">
        <DashboardHeader title={title} onSave={updateDashboard} />
        <DashboardView data={data} update={setDashboard} />
      </div>
    </>
  )
}
