import React, { useState, useEffect, useContext } from 'react'
import statusCode from 'http-status-codes'
import { DashboardItem } from './DashboardItem'
import { ModalContext } from '../../context/ModalContext'
import { INITIAL } from '../../hooks/useDashboard'
import { MetaData } from '../../components/meta-data/MetaData'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import './DashboardList.scss'

export function DashboardList() {
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
    const [status, data] = await create(INITIAL)
    if (status === statusCode.CREATED) {
      return `/dashboards/${data.id}`
    } else {
      return '/not-found'
    }
  }

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2">
          <h4 className="my-0">{title}</h4>
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
        <hr className="my-2" />
        <div className="dashboard-list">
          <ul>
            {dashboards.map(dashboard => {
              return (
                <li key={dashboard.id} className="my-2">
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
