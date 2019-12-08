import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../common/hooks'
import { Pagination } from '../../common/components/pagination/Pagination'
import { Item } from '../../common/components/ui/Item'

export function Charts() {
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const [result, setResult] = useState({ total: 0, charts: [] })
  const [, access, ,] = useApiEndpoint('/charts')

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access({
        params: {
          skip: itemsPerPage * page,
          take: itemsPerPage,
        },
      })
      if (status === statusCode.OK) {
        setResult(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [page])

  return (
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
              {result.charts.map(d => {
                return (
                  <Item
                    key={d.id}
                    title={d.title}
                    subtitle={`@${d.slug}`}
                    description={d.description}
                    link={`/charts/${d.id}`}
                    linkLabel={'View Dashboard'}
                  />
                )
              })}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        total={result.total}
      />
    </div>
  )
}
