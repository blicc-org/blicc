import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { Redirect } from 'react-router-dom'
import { useApiEndpoint } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { useModal, useLanguage } from '../../common/hooks'
import { CreateDashboardModal } from './CreateDashboardModal'
import { Pagination, Empty, Loading, Item } from '../../common/components/ui'
import { API } from '../../config'
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
  const content = useLanguage()
  const itemsPerPage = 10
  const [isLoading, setIsLoading] = useState(true)
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
        setIsLoading(false)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [page])

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData
        title={content.dashboards.title}
        description={content.dashboards.description}
        path={'/dashboards'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{content.dashboards.title}</h2>
          <div className="btn-toolbar">
            <button
              title={content.dashboards.create}
              type="button"
              className="btn btn-sm btn-primary"
              onClick={showModal}
            >
              {content.dashboards.create}
            </button>
          </div>
        </div>
        <div className="dashboard-list">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {result.dashboards.length === 0 ? (
                <Empty>{content.dashboards.empty}</Empty>
              ) : (
                <table className="table">
                  <tbody>
                    {result.dashboards.map((d) => (
                      <Item
                        key={d.id}
                        thumbnail={`${API.ORIGIN}/dashboard-thumbnails/${d.id}.jpg?resolution=640x360`}
                        title={d.title}
                        subtitle={d.creationDate.split('T')[0]}
                        description={d.description}
                        link={`/dashboards/${d.id}`}
                        linkLabel={content.dashboards.view}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </>
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
