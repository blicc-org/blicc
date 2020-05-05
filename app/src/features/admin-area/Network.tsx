import React, { useEffect, useState, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { useEndpoint } from '../../common/hooks'
import { DELIVERY } from '../../config'

interface Api {
  rabbitmq: boolean
  redis: boolean
  postgresql: boolean
  ipAddress: string
}

interface Delivery {
  rabbitmq: boolean
  redis: boolean
  mongodb: boolean
}

export function Network(): ReactElement {
  const apiInit: Api = {
    rabbitmq: false,
    redis: false,
    postgresql: false,
    ipAddress: '',
  }
  const deliveryInit: Delivery = {
    rabbitmq: false,
    redis: false,
    mongodb: false,
  }

  const [api, setApi] = useState<Api>(apiInit)
  const [delivery, setDelivery] = useState<Delivery>(deliveryInit)
  const [, accessApi, ,] = useEndpoint('/health-check')
  const [, accessDelivery, ,] = useEndpoint('/health-check', DELIVERY.ORIGIN)

  useEffect(() => {
    async function fetchApi(): Promise<void> {
      const [status, data] = await accessApi()
      if (status === statusCode.OK) {
        setApi(data)
      }
    }
    async function fetchDelivery(): Promise<void> {
      const [status, data] = await accessDelivery()
      if (status === statusCode.OK) {
        setDelivery(data)
      }
    }

    fetchApi()
    fetchDelivery()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h4 className="my-0">Network</h4>
      </div>
      <div className="card col-lg-6 p-0">
        <Table title="Resource Management API" object={api} />
        <Table title="Data Delivery API" object={delivery} />
      </div>
    </>
  )
}

interface Props {
  title: string
  object: any
}

function Table({ title, object }: Props): ReactElement {
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th colSpan={2} scope="colgroup">
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(object).map((key) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{object[key] + ''}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
