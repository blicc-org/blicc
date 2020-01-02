import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { DataSourceDetails } from './DataSourceDetails'
import { DataSourceHeader } from './DataSourceHeader'

export function DataSourceView({ match }) {
  const path = `/data-sources/${match.params.id}`
  const [, access] = useApiEndpoint(path)
  const [dataSource, setDataSource] = useState({})
  const {
    title,
    description,
    persistData,
    fetchFrequency,
    creationDate,
  } = dataSource

  const tabs = ['Data Mapping', 'Details']
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

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="container-fluid dashboard">
        <DataSourceHeader
          title={title}
          onSave={() => {}}
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? (
          <>{<p>nais</p>}</>
        ) : (
          <DataSourceDetails
            title={title}
            description={description}
            persistData={persistData}
            fetchFrequency={fetchFrequency}
            creationDate={creationDate}
          />
        )}
      </div>
    </>
  )
}
