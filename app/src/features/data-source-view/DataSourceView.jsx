import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'

export function DataSourceView({ match }) {
  const path = `/data-sources/${match.params.id}`
  const [, access] = useApiEndpoint(path)
  const [data, setData] = useState({})
  const { title, description, persistData, fetchFrequency, creationDate } = data

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
      <MetaData title={title} description={description} path={path} />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{title}</h2>
        </div>
        <div className="col px-0">
          <div className="card">
            <h5 className="card-header">Details</h5>
            <div className="card-body">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <b>Title:</b>
                    </td>
                    <td>{title}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Description:</b>
                    </td>
                    <td>{description}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Persist data:</b>
                    </td>
                    <td>{persistData ? 'enabled' : 'disabled'}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Fetch frequency:</b>
                    </td>
                    <td>Every {fetchFrequency / (60 * 60 * 1000)} hours</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Registration date:</b>
                    </td>
                    <td>{creationDate ? creationDate.split('T')[0] : ''}</td>
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
