import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../common/hooks'

export function Network() {
  const [config, setConfig] = useState({ ipAddress: '0:0:0:0' })
  const [, accessConfig, ,] = useApiEndpoint('/health-check/config')
  const { ipAddress } = config

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await accessConfig()
      if (status === statusCode.OK) {
        setConfig(data)
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
        Resource Management API IP-Address: <b>{ipAddress}</b>
      </p>
    </>
  )
}
