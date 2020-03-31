import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import {
  useApiEndpoint,
  useDeliveryEndpoint,
  useModal,
  useLanguage,
} from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { DataSourceDetails } from './DataSourceDetails'
import { ConfirmationModal, Tabs, PageHeader } from '../../common/components/ui'
import { DataSource } from './DataSource'

const INITIAL = {
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

export function DataSourceView({ match, location }) {
  const content = useLanguage()
  const path = `/data-sources/${match.params.id}`
  const [, access, update, remove] = useApiEndpoint(path)
  const [dataSource, setDataSource] = useState(INITIAL)
  const [publish, subscribe, state] = useDeliveryEndpoint()
  const [input, setInput] = useState('')
  const stringify = (s) => JSON.stringify(s, null, 4)
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
      subscribe(channel, (str) => {
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
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setDataSource(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  async function onClick(evt) {
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
      submit={async () => {
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
        <PageHeader edit={edit} title={title} onClick={onClick} />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? (
          <DataSource
            input={input}
            data={data}
            setData={(d) => setDataSource({ ...dataSource, data: d })}
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
