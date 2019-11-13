import React, { useState, useEffect } from 'react'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import statusCode from 'http-status-codes'

export function ListDashboards() {
  const [dashboards, setDashboards] = useState([])
  const [, access, ,] = useApiEndpoint('/dashboards')

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access({
        params: { fields: 'id,title,creationDate' },
      })
      if (status === statusCode.OK) {
        setDashboards(data.dashboards)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

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
