import React, { useState, useEffect } from 'react'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { useApiEndpoint } from '../../common/hooks'
import { Redirect } from 'react-router-dom'

export function DashboardShared({ match }) {
  const { id } = match.params
  const path = `/dashboards/${id}`
  const [, access, ,] = useApiEndpoint(path)
  const [dashboard, setDashboard] = useState({})
  const { title = '', description = '' } = dashboard
  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    async function getData() {
      const [status, data] = await access()
      if (status === 200) {
        setDashboard(data)
      } else {
        setRedirect('/not-found')
      }
    }

    getData()
  }, [access])

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData title={title} description={description} path={path} />
      <h1>{title}</h1>
      <p>{JSON.stringify(dashboard)}</p>
    </>
  )
}
