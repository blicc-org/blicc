import React, { useState, useEffect, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import {
  useEndpoint,
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
  CreateModal,
} from '../../common/components/ui'
import { List, DataSource } from '../../common/interfaces'

interface Request {
  url: string
  headers: Array<any>
}

interface Data {
  request: Request
  query: string
}

interface RequestBody {
  title: string
  description: string
  data: Data
}

export function DataSources(): ReactElement {
  const [list, setList] = useState<List<DataSource>>()
  const { dataSources: text } = useLanguage()
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [create, access, ,] = useEndpoint('/data-sources')
  const [redirect, setRedirect] = useState('')
  const format = useDateFormatter()
  const [reqBody, setReqBody] = useState<RequestBody>({
    title: '',
    description: '',
    data: {
      request: {
        url: '',
        headers: [],
      },
      query: '',
    },
  })

  const [showModal, hideModal] = useModal(
    () => (
      <CreateModal<RequestBody>
        name="data source"
        cancel={hideModal}
        submit={submit}
        setResource={setReqBody}
      />
    ),
    [reqBody]
  )

  async function submit(): Promise<void> {
    const [status, data] = await create(reqBody)
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
          {(item): ReactElement => (
            <Item
              key={item.id}
              thumbnail={`/data-source-thumbnails/${item.id}.jpg`}
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
