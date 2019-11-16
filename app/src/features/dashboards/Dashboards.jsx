import React, { useState, useEffect, useContext } from 'react'
import statusCode from 'http-status-codes'
import { DashboardsItem } from './DashboardsItem'
import { ModalContext } from '../../common/context'
import { useApiEndpoint, INITIAL_DASHBOARD } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import './Dashboards.scss'

export function Dashboards() {
  const title = 'Dashboards'
  const description = 'View all dashboards'
  const path = '/dashboards'

  const [dashboards, setDashboards] = useState([])
  const [create, access, ,] = useApiEndpoint(path)
  const [, showModal] = useContext(ModalContext)

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

  async function createDashboard() {
    showModal(
      'Create Dashboard',
      'Do you want to create a Dashboard?',
      'Cancel',
      'Create',
      () => {},
      () => sendData()
    )
  }

  async function sendData() {
    const [status, data] = await create(INITIAL_DASHBOARD)
    if (status === statusCode.CREATED) {
      return `/dashboards/${data.id}`
    } else {
      return '/not-found'
    }
  }

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{title}</h2>
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={createDashboard}
            >
              New Dashboard
            </button>
          </div>
        </div>
        <div className="dashboard-list">
          <table className="table">
            <tbody>
              {dashboards.map(dashboard => {
                return (
                  <DashboardsItem
                    key={dashboard.id}
                    id={dashboard.id}
                    title={dashboard.title}
                    creationDate={dashboard.creationDate}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
