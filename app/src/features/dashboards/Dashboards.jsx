import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { DashboardsItem } from './DashboardsItem'
import { ModalContext } from '../../common/context'
import { useApiEndpoint, INITIAL_DASHBOARD } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import './Dashboards.scss'
import { Pagination } from '../../common/components/pagination/Pagination'

export function Dashboards() {
  const title = 'Dashboards'
  const description = 'View all dashboards'
  const path = '/dashboards'
  const itemsPerPage = 10

  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, dashboards: [] })
  const [create, access, ,] = useApiEndpoint(path)
  const [, showModal] = useContext(ModalContext)

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access({
        params: {
          fields: 'id,title,creationDate',
          skip: itemsPerPage * page,
          take: itemsPerPage,
        },
      })
      if (status === statusCode.OK) {
        setResult(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [page])

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
        <div className="dashboard-tabs my-2">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                {`Your Dashboards `}
                <span className="badge badge-secondary">{result.total}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Explore Dashboards
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboard-list">
          {result.dashboards.length === 0 ? (
            <p className="text-muted mx-auto py-5 my-5 text-center">
              No dashboards found. Click in the top right corner on New
              Dashboard to create one.
            </p>
          ) : (
            <table className="table">
              <tbody>
                {result.dashboards.map(dashboard => {
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
          )}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          total={result.total}
        />
      </div>
    </>
  )
}
