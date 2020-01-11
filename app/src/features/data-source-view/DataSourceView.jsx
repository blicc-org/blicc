import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { useApiEndpoint, useModal, useDataflow } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { DataSourceDetails } from './DataSourceDetails'
import { ConfirmationModal, Tabs, PageHeader } from '../../common/components/ui'
import { DataFlow } from './DataFlow'

const INITIAL = {
  title: '',
  description: '',
  persistData: false,
  fetchFrequency: 0,
  creationDate: '',
  data: { url: '' },
}

export function DataSourceView({ match, location }) {
  const path = `/data-sources/${match.params.id}`
  const [, access, update, remove] = useApiEndpoint(path)
  const [dataSource, setDataSource] = useState(INITIAL)
  const { title, description } = dataSource

  const [redirect, setRedirect] = useState('')
  const [edit, setEdit] = useState(
    location.search && location.search === '?edit'
  )

  const tabs = ['Data Flow', 'Details']
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const [test] = useDataflow()
  const text = test()
  console.log(text)

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
      <div className="container-fluid dashboard">
        <PageHeader edit={edit} title={title} onClick={onClick} />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? (
          <DataFlow dataSource={dataSource} setDataSource={setDataSource} />
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
