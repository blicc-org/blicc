import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { DataSourceItems } from './DataSourceItems'
import { useApiEndpoint } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { Pagination } from '../../common/components/pagination/Pagination'

export function DataSources() {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, dataSources: [] })
  const [, access, ,] = useApiEndpoint('/data-sources')

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
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => console.log('create new data source')}
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
                {result.dataSources.map(dataSource => {
                  return (
                    <DataSourceItems
                      key={dataSource.id}
                      dataSource={dataSource}
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
