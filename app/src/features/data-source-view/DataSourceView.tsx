import React, { useEffect, useState, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import {
  useEndpoint,
  useEndpointWebSocket,
  useModal,
  useLanguage,
} from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { DataSourceDetails } from './DataSourceDetails'
import {
  ConfirmationModal,
  Tabs,
  Heading,
  Button,
  ButtonType,
} from '../../common/components/ui'
import { DataSource } from './DataSource'

const INITIAL = {
  id: undefined,
  title: '',
  description: '',
  persistData: false,
  fetchFrequency: 0,
  creationDate: '',
  data: {
    request: {
      url: '',
      headers: [],
    },
    query: '',
  },
}

export function DataSourceView({ match, location }: any): ReactElement {
  const content = useLanguage()
  const path = `/data-sources/${match.params.id}`
  const [, access, update, remove] = useEndpoint(path)
  const [dataSource, setDataSource] = useState(INITIAL)
  const [publish, subscribe, state] = useEndpointWebSocket()
  const [input, setInput] = useState('')
  const stringify = (s: any): string => JSON.stringify(s, null, 4)
  const { id, title, description, data } = dataSource
  const { url, headers } = data.request
  const channel = `/forwarding/${id}`

  const [redirect, setRedirect] = useState('')
  const [edit, setEdit] = useState(
    location.search && location.search === '?edit'
  )

  const tabs = [content.dataSource, content.details]
  const [currentTab, setCurrentTab] = useState(tabs[0])

  useEffect(() => {
    if (state === WebSocket.OPEN && url) {
      subscribe(channel, (str: any) => {
        setInput(stringify(str))
      })
      const publishBody = {
        request: {
          url,
          headers,
        },
      }
      publish(channel, publishBody)
    }
    // eslint-disable-next-line
  }, [url, state])

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setDataSource(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  async function onClick(evt: any): Promise<void> {
    evt.target.blur()
    if (edit) {
      await update(dataSource)
      setRedirect(`/data-sources/${match.params.id}`)
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  const [showModal, hideModal] = useModal(() => (
    <ConfirmationModal
      title="Delete data source"
      description="Do you really want to delete the data source?"
      submitPhrase="Delete"
      submit={async (): Promise<void> => {
        hideModal()
        const [status] = await remove()
        if (status === statusCode.OK) {
          setRedirect('/data-sources')
        }
      }}
      cancel={hideModal}
    />
  ))

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData title={title} description={description} path={path} />
      <div className="container-fluid">
        <Heading title={title}>
          <Button
            type={edit ? ButtonType.Primary : ButtonType.OutlineSecondary}
            onClick={onClick}
          >
            {edit ? 'Save' : 'Edit'}
          </Button>
        </Heading>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? (
          <DataSource
            input={input}
            data={data}
            setData={(d: any): void =>
              setDataSource({ ...dataSource, data: d })
            }
          />
        ) : (
          <DataSourceDetails
            edit={edit}
            dataSource={dataSource}
            setDataSource={setDataSource}
            remove={showModal}
          />
        )}
      </div>
    </>
  )
}
