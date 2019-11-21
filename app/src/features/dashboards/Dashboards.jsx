import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { DashboardsItem } from './DashboardsItem'
import { useApiEndpoint, INITIAL_DASHBOARD } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { Pagination } from '../../common/components/pagination/Pagination'
import { useModal } from '../../common/hooks/useModal'
import { CreateDashboardModal } from './CreateDashboardModal'
import './Dashboards.scss'

export function Dashboards() {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, dashboards: [] })
  const [create, access, ,] = useApiEndpoint('/dashboards')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [redirect, setRedirect] = useState('')

  const [showModal, hideModal] = useModal(
    () => (
      <CreateDashboardModal
        setTitle={setTitle}
        setDescription={setDescription}
        cancel={hideModal}
        submit={submit}
      />
    ),
    [title, description]
  )

  async function submit() {
    const [status, data] = await create({ ...INITIAL_DASHBOARD, title })
    if (status === statusCode.CREATED) {
      setRedirect(`/dashboards/${data.id}`)
    }
    hideModal()
  }

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

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData
        title={'Dashboards'}
        description={'Description'}
        path={'/dashboards'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Dashboards</h2>
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={showModal}
            >
              New Dashboard
            </button>
          </div>
        </div>
        <div className="dashboard-tabs my-2">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/"
                onClick={event => event.preventDefault()}
              >
                {'Your Dashboards '}
                <span className="badge badge-secondary">{result.total}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={event => event.preventDefault()}
              >
                {'Starred Dashboards '}
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
