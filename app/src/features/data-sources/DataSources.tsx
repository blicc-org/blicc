import React, { useState, useEffect, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import {
  useApiEndpoint,
  useModal,
  useLanguage,
  useDateFormatter,
} from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import {
  Item,
  Pagination,
  Listing,
  Heading,
  Button,
  ButtonType,
} from '../../common/components/ui'
import { CreateDataSourceModal } from './CreateDataSourceModal'
import { List, DataSource } from '../../common/interfaces'

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
  const [list, setList] = useState<List<DataSource>>()
  const { dataSources: text } = useLanguage()
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [create, access, ,] = useApiEndpoint('/data-sources')
  const [redirect, setRedirect] = useState('')
  const [title, setTitle] = useState('')
  const [fetchFrequency, setFetchFrequency] = useState(0)
  const [persistData, setPersistData] = useState(true)
  const format = useDateFormatter()

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
        setList({ total: data.total, list: data.dataSources })
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [page])

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData
        title={text.title}
        description={text.description}
        path={'/data-sources'}
      />
      <div className="container">
        <Heading title={text.title}>
          <Button type={ButtonType.Primary} onClick={showModal}>
            {text.create}
          </Button>
        </Heading>
        <Listing<DataSource> list={list} emptyText={text.empty}>
          {(item) => (
            <Item
              key={item.id}
              title={item.title}
              subtitle={format(item.creationDate)}
              description={item.description}
              link={`/data-sources/${item.id}`}
              linkLabel={text.view}
            />
          )}
        </Listing>
        <Pagination
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          total={list ? list.total : 0}
        />
      </div>
    </>
  )
}
