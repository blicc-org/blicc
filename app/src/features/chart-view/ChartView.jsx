import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import './ChartView.scss'

export function ChartView({ match }) {
  const path = `/charts/${match.params.id}`
  const [, access] = useApiEndpoint(path)
  const [data, setData] = useState({})

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setData(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  return (
    <>
      <MetaData
        title={'chart view'}
        description={'chart view ...'}
        path={path}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{data.title}</h2>
        </div>
        <div className="col px-0">
          <div className="card">
            <h5 className="card-header">Details</h5>
            <div className="card-body">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <b>Bundle:</b>
                    </td>
                    <td>{data.bundle}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Description:</b>
                    </td>
                    <td>{data.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Registration date:</b>
                    </td>
                    <td>
                      {data.creationDate ? data.creationDate.split('T')[0] : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
