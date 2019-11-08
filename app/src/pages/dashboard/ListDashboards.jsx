import React, { useState, useEffect } from 'react'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import statusCode from 'http-status-codes'

export function ListDashboards() {
  const [data, setData] = useState('')
  const [, access, ,] = useApiEndpoint('/dashboards')

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      console.log(status)
      console.log(data)
      if (status === statusCode.OK) {
        setData(JSON.stringify(data))
      }
    }
    fetchData()
  }, [access])

  return (
    <>
      <div>
        <p>{data}</p>
      </div>
    </>
  )
}
