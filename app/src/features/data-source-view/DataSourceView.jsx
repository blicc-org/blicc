import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import statusCode from 'http-status-codes'
import { useApiEndpoint, useModal } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { DataSourceDetails } from './DataSourceDetails'
import { ConfirmationModal, Tabs, PageHeader } from '../../common/components/ui'

export function DataSourceView({ match, location }) {
  const path = `/data-sources/${match.params.id}`
  const [, access, update, remove] = useApiEndpoint(path)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [persistData, setPersistData] = useState(false)
  const [fetchFrequency, setFetchFrequency] = useState(0)
  const [dataSource, setDataSource] = useState({})
  const { creationDate, data } = dataSource

  const [redirect, setRedirect] = useState('')
  const [edit, setEdit] = useState(
    location.search && location.search === '?edit'
  )

  const tabs = ['Data Mapping', 'Details']
  const [currentTab, setCurrentTab] = useState(tabs[0])

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setTitle(data.title)
        setDescription(data.description)
        setPersistData(data.persistData)
        setFetchFrequency(data.fetchFrequency)
        setDataSource(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  async function onClick(evt) {
    evt.target.blur()
    if (edit) {
      await update({
        ...dataSource,
        title,
        description,
        persistData,
        fetchFrequency,
      })
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
          <>{edit ? 'edit' : JSON.stringify(data)}</>
        ) : (
          <DataSourceDetails
            edit={edit}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            persistData={persistData}
            setPersistData={setPersistData}
            fetchFrequency={fetchFrequency}
            setFetchFrequency={setFetchFrequency}
            creationDate={creationDate}
            remove={showModal}
          />
        )}
      </div>
    </>
  )
}
