import React, { useState, useEffect, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { useApiEndpoint, useModal, useLanguage } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { Item, Pagination, Empty, Loading } from '../../common/components/ui'
import { CreateDataSourceModal } from './CreateDataSourceModal'
import './DataSources.scss'
import { DataSourceList, DataSource } from '../../common/interfaces'

export const FREQUENCY = {
  DAILY: 86400000,
  MONTHLY: 2592000000,
  YEARLY: 31536000000,
}

export const INITIAL_DATA_SOURCE = {
  title: '',
  description: '',
  persistData: false,
  fetchFrequency: FREQUENCY.DAILY,
  data: {
    request: {
      url: '',
      headers: [],
    },
    query: '',
  },
}

export function DataSources(): ReactElement {
  const initDataSourceList: DataSourceList = { total: 0, dataSources: [] }
  const [dataSourceList, setDataSourceList] = useState(initDataSourceList)
  const content = useLanguage()
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [create, access, ,] = useApiEndpoint('/data-sources')
  const [isLoading, setIsLoading] = useState(true)
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

  async function submit(): Promise<void> {
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
    async function fetchData(): Promise<void> {
      const [status, data] = await access({
        params: {
          fields: 'id,title,description,creationDate',
          skip: itemsPerPage * page,
          take: itemsPerPage,
        },
      })
      if (status === statusCode.OK) {
        setDataSourceList(data)
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
        <div className="data-source-list">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {dataSourceList.dataSources.length === 0 ? (
                <Empty>{content.dataSources.empty}</Empty>
              ) : (
                <table className="table">
                  <tbody>
                    {dataSourceList.dataSources.map(
                      (dataSource: DataSource): ReactElement => (
                        <Item
                          key={dataSource.id}
                          title={dataSource.title}
                          subtitle={dataSource.creationDate.split('T')[0]}
                          description={dataSource.description}
                          link={`/data-sources/${dataSource.id}`}
                          linkLabel={content.dataSources.view}
                        />
                      )
                    )}
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
          total={dataSourceList.total}
        />
      </div>
    </>
  )
}
