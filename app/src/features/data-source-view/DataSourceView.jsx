import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { useApiEndpoint, useModal } from '../../common/hooks'
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
  data: { url: '', query: '' },
}

export function DataSourceView({ match, location }) {
  const path = `/data-sources/${match.params.id}`
  const [, access, update, remove] = useApiEndpoint(path)
  const [dataSource, setDataSource] = useState(INITIAL)
  const { id, title, description, data } = dataSource

  const [redirect, setRedirect] = useState('')
  const [edit, setEdit] = useState(
    location.search && location.search === '?edit'
  )

  const tabs = ['Data Source', 'Details']
  const [currentTab, setCurrentTab] = useState(tabs[0])

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
            id={id}
            data={data}
            setData={d => setDataSource({ ...dataSource, data: d })}
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
