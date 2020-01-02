import React, { useEffect, useState, useContext } from 'react'
import statusCode from 'http-status-codes'
import { DashboardHeader } from './DashboardHeader'
import { Arrangement } from '../../common/components/arrangement/Arrangement'
import { useApiEndpoint } from '../../common/hooks'
import { ArrangementContext, SettingsContext } from '../../common/context'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { DashboardDetails } from './DashboardDetails'
import { Toolbox } from '../../common/components/toolbox/Toolbox'
import './DashboardView.scss'

export function DashboardView({ match }) {
  const [arrangement, setArrangement] = useContext(ArrangementContext)
  const [settings, setSettings] = useContext(SettingsContext)
  const path = `/dashboards/${match.params.id}`
  const [, access, update] = useApiEndpoint(path)
  const [dashboard, setDashboard] = useState({})
  const { title, userId, creationDate, description } = dashboard

  const tabs = ['Dashboard', 'Details']
  const [currentTab, setCurrentTab] = useState(tabs[0])

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setDashboard(data)
        setArrangement(data.data.arrangement)
        setSettings(data.data.settings)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  async function updateDashboard() {
    const [status] = await update({
      ...dashboard,
      data: { arrangement, settings },
    })
    if (status === statusCode.OK) {
      console.log('update was successful!')
    }
  }

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <Toolbox />
      <div className="container-fluid dashboard">
        <DashboardHeader
          title={title}
          onSave={updateDashboard}
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? (
          <>{dashboard.data && <Arrangement />}</>
        ) : (
          <DashboardDetails
            title={title}
            userId={userId}
            creationDate={creationDate}
            description={description}
          />
        )}
      </div>
    </>
  )
}
