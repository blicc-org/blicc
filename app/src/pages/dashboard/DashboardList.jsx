import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { DashboardItem } from './DashboardItem'
import { MetaData } from '../../components/meta-data/MetaData'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import './DashboardList.scss'

export function DashboardList() {
  const title = 'List all dasbhoards'
  const description = 'View all dashboards'
  const path = '/dashboards'

  const [dashboards, setDashboards] = useState([])
  const [, access, ,] = useApiEndpoint(path)

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access({
        params: { fields: 'id,title,creationDate' },
      })
      if (status === statusCode.OK) {
        setDashboards(data.dashboards)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="container-fluid">
        <div className="dashboard-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 pr-3">{title}</h1>
        </div>
        <div className="dashboard-list">
          <ul>
            {dashboards.map(dashboard => {
              return (
                <li key={dashboard.id} className="my-3">
                  <DashboardItem
                    id={dashboard.id}
                    title={dashboard.title}
                    creationDate={dashboard.creationDate}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
