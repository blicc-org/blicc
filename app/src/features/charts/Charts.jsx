import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { ChartsItem } from './ChartsItem'
import { useApiEndpoint } from '../../common/hooks'

export function Charts() {
  const [result, setResult] = useState({ total: 0, charts: [] })
  const [, access, ,] = useApiEndpoint('/charts')

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setResult(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Charts</h2>
        </div>
        <div className="chart-list">
          {result.total === 0 ? (
            <p className="text-muted mx-auto py-5 my-5 text-center">
              No charts fount.
            </p>
          ) : (
            <table className="table">
              <tbody>
                {result.charts.map(chart => {
                  return <ChartsItem key={chart.id} chart={chart} />
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
