import React, { useState, useEffect } from 'react'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import statusCode from 'http-status-codes'

export function ListDashboards() {
  const [dashboards, setDashboards] = useState([])
  const [, access, ,] = useApiEndpoint(
    '/dashboards?fields=id,title,creationDate'
  )

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setDashboards(data.dashboards)
      }
    }
    fetchData()
  }, [access])

  return (
    <ul>
      {dashboards.map(dashboard => {
        return (
          <li key={dashboard.id}>
            Title: {dashboard.title}, erstellt am: {dashboard.creationDate}
          </li>
        )
      })}
    </ul>
  )
}
