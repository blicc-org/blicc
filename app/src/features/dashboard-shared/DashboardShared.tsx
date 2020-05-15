import React, { useState, useEffect, ReactElement, useContext } from 'react'
import statusCode from 'http-status-codes'
import { MetaData } from '../../common/components/meta-data/MetaData'
import {
  useEndpoint,
  useMobile,
  useInstalled,
  useEndpointWebSocket,
} from '../../common/hooks'
import { Redirect } from 'react-router-dom'
import { Arrangement } from '../../common/components/arrangement/Arrangement'
import { ArrangementContext, SettingsContext } from '../../common/context'
import { Heading } from '../../common/components/ui'
import './DashboardShared.scss'

export function DashboardShared({ match }: any): ReactElement {
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  const [, setArrangement] = useContext(ArrangementContext)
  const [, setSettings] = useContext(SettingsContext)
  const { id } = match.params
  const path = `/dashboards/${id}`
  const [, access, ,] = useEndpoint(path)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [redirect, setRedirect] = useState('')
  const [publish, subscribe] = useEndpointWebSocket()

  const style =
    isMobile && isInstalled
      ? { height: window.innerHeight - 90 }
      : { height: window.innerHeight - 40 }

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setTitle(data.title)
        setDescription(data.description)
        setArrangement(data.data.arrangement)
        setSettings(data.data.settings)
      } else {
        setRedirect('/not-found')
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData title={title} description={description} path={path} />
      <div className="container-fluid dashboard-shared" style={style}>
        <Heading title={title} />
        <Arrangement publish={publish} subscribe={subscribe} />
      </div>
    </>
  )
}
