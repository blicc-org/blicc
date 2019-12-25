import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { useApiEndpoint, useModal } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { Item, Pagination } from '../../common/components/ui'
import { CreateDataSourceModal } from './CreateDataSourceModal'

export function DataSources() {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, dataSources: [] })
  const [, access, ,] = useApiEndpoint('/data-sources')
  const [redirect, setRedirect] = useState('')

  const [title, setTitle] = useState('')

  const [showModal, hideModal] = useModal(
    () => (
      <CreateDataSourceModal
        cancel={hideModal}
        submit={submit}
        setTitle={setTitle}
        setFrequency={() => {}}
        setPersistData={() => {}}
        setUrl={() => {}}
      />
    ),
    [title]
  )

  function submit() {
    setRedirect('')
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
        title={'Data Sources'}
        description={'List all data sources.'}
        path={'/data-sources'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Data Sources</h2>
          <div className="btn-toolbar">
            <button
              title="Create new data source"
              type="button"
              className="btn btn-sm btn-primary"
              onClick={showModal}
            >
              New DataSource
            </button>
          </div>
        </div>
        <div>
          {result.dataSources.length === 0 ? (
            <p className="text-muted mx-auto py-5 my-5 text-center">
              No data sources found. Click in the top right corner on New Data
              Source to create one.
            </p>
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
                    linkLabel={'View Data Source'}
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
