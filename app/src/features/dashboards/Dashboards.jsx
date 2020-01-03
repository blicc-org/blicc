import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { Redirect } from 'react-router-dom'
import { useApiEndpoint } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { useModal } from '../../common/hooks/useModal'
import { CreateDashboardModal } from './CreateDashboardModal'
import { Item, Tabs, Pagination, Empty } from '../../common/components/ui'
import './Dashboards.scss'

export const INITIAL_DASHBOARD = {
  title: '',
  description: '',
  data: {
    arrangement: {},
    settings: {},
  },
}

export function Dashboards() {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, dashboards: [] })
  const [create, access, ,] = useApiEndpoint('/dashboards')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [redirect, setRedirect] = useState('')

  const tabs = ['Your dashboards', 'Starred dashboards']
  const [currentTab, setCurrentTab] = useState(tabs[0])

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
    const [status, data] = await create({
      ...INITIAL_DASHBOARD,
      title,
      description,
    })
    if (status === statusCode.CREATED) {
      setRedirect(`/dashboards/${data.id}?edit`)
    }
    hideModal()
  }

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access({
        params: {
          fields: 'id,title,description,creationDate',
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
        description={'Browse through all the dashboards and analyse your data.'}
        path={'/dashboards'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Dashboards</h2>
          <div className="btn-toolbar">
            <button
              title="Create new dashboard"
              type="button"
              className="btn btn-sm btn-primary"
              onClick={showModal}
            >
              New Dashboard
            </button>
          </div>
        </div>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <div className="dashboard-list">
          {result.dashboards.length === 0 ? (
            <Empty>
              No dashboards found. Click in the top right corner on New
              Dashboard to create one.
            </Empty>
          ) : (
            <table className="table">
              <tbody>
                {result.dashboards.map(d => (
                  <Item
                    key={d.id}
                    title={d.title}
                    subtitle={d.creationDate.split('T')[0]}
                    description={d.description}
                    link={`/dashboards/${d.id}`}
                    linkLabel={'View Dashboard'}
                  />
                ))}
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
