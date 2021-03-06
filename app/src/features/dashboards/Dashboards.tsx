import React, { useState, useEffect, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { Redirect } from 'react-router-dom'
import { useEndpoint, useDateFormatter } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { useModal, useLanguage } from '../../common/hooks'
import {
  Pagination,
  Listing,
  Item,
  Heading,
  Button,
  ButtonType,
  CreationModal,
} from '../../common/components/ui'
import { Dashboard, List } from '../../common/interfaces'

interface Data {
  arrangement: any
  settings: any
}

interface RequestBody {
  title: string
  description: string
  data: Data
}

export function Dashboards(): ReactElement {
  const [list, setList] = useState<List<Dashboard>>()
  const { dashboards: text } = useLanguage()
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [create, access, ,] = useEndpoint('/dashboards')
  const [redirect, setRedirect] = useState('')
  const format = useDateFormatter()
  const [reqBody, setReqBody] = useState<RequestBody>({
    title: '',
    description: '',
    data: {
      arrangement: {},
      settings: {},
    },
  })

  const [showModal, hideModal] = useModal(
    () => (
      <CreationModal
        name="dashboard"
        setResource={setReqBody}
        cancel={hideModal}
        submit={submit}
      />
    ),
    [reqBody]
  )

  async function submit(): Promise<void> {
    const [status, data] = await create(reqBody)
    if (status === statusCode.CREATED) {
      setRedirect(`/dashboards/${data.id}?edit`)
    }
    hideModal()
  }

  useEffect((): void => {
    async function fetchData(): Promise<void> {
      const [status, data] = await access({
        params: {
          fields: 'id,title,description,creationDate',
          skip: itemsPerPage * page,
          take: itemsPerPage,
        },
      })
      if (status === statusCode.OK) {
        setList({ total: data.total, list: data.dashboards })
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
        path={'/dashboards'}
      />
      <div className="container">
        <Heading title={text.title}>
          <Button type={ButtonType.Primary} onClick={showModal}>
            {text.create}
          </Button>
        </Heading>
        <Listing<Dashboard> list={list} emptyText={text.empty}>
          {(item): ReactElement => (
            <Item
              key={item.id}
              thumbnail={`/dashboard-thumbnails/${item.id}.jpg`}
              title={item.title}
              subtitle={format(item.creationDate)}
              description={item.description}
              link={`/dashboards/${item.id}`}
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
