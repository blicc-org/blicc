import React, { useEffect, useState, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../common/hooks'

export function Network(): ReactElement {
  const [healthCheck, setHealthCheck] = useState({ ipAddress: '0:0:0:0' })
  const [, access, ,] = useApiEndpoint('/health-check')
  const { ipAddress } = healthCheck

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setHealthCheck(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h4 className="my-0">Network</h4>
      </div>
      <hr />
      <p className="card-text">
        IP-Address: <b>{ipAddress}</b>
      </p>
    </>
  )
}
