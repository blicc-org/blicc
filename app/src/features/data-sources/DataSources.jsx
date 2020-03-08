import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { useApiEndpoint, useModal, useLanguage } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { Item, Pagination, Empty } from '../../common/components/ui'
import { CreateDataSourceModal } from './CreateDataSourceModal'

export const FREQUENCY = {
  DAILY: 86400000,
  MONTHLY: 2592000000,
  YEARLY: 31536000000,
}

export const INITIAL_DATA_SOURCE = {
  title: '',
  description: '',
  data: { url: '', query: '' },
  persistData: false,
  fetchFrequency: FREQUENCY.DAILY,
}

export function DataSources() {
  const content = useLanguage()
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, dataSources: [] })
  const [create, access, ,] = useApiEndpoint('/data-sources')
  const [redirect, setRedirect] = useState('')

  const [title, setTitle] = useState('')
  const [fetchFrequency, setFetchFrequency] = useState(0)
  const [persistData, setPersistData] = useState(true)

  const [showModal, hideModal] = useModal(
    () => (
      <CreateDataSourceModal
        cancel={hideModal}
        submit={submit}
        setTitle={setTitle}
        setPersistData={setPersistData}
        fetchFrequency={fetchFrequency}
        setFetchFrequency={setFetchFrequency}
      />
    ),
    [title, fetchFrequency, persistData]
  )

  async function submit() {
    const [status, data] = await create({
      ...INITIAL_DATA_SOURCE,
      title,
      persistData,
      fetchFrequency,
    })
    if (status === statusCode.CREATED) {
      setRedirect(`/data-sources/${data.id}?edit`)
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
        title={content.dataSources.title}
        description={content.dataSources.description}
        path={'/data-sources'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{content.dataSources.title}</h2>
          <div className="btn-toolbar">
            <button
              title={content.dataSources.create}
              type="button"
              className="btn btn-sm btn-primary"
              onClick={showModal}
            >
              {content.dataSources.create}
            </button>
          </div>
        </div>
        <div>
          {result.dataSources.length === 0 ? (
            <Empty>{content.dataSources.empty}</Empty>
          ) : (
            <table className="table">
              <tbody>
                {result.dataSources.map(d => (
                  <Item
                    key={d.id}
                    title={d.title}
                    subtitle={d.creationDate.split('T')[0]}
                    description={d.description}
                    link={`/data-sources/${d.id}`}
                    linkLabel={content.dataSources.view}
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
