import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { useApiEndpoint } from '../../common/hooks'
import { Item, Pagination, Empty } from '../../common/components/ui'

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
    <>
      <MetaData
        title={'Charts'}
        description={'Browse through all the charts.'}
        path={'/charts'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Charts</h2>
        </div>
        <div className="chart-list">
          {result.total === 0 ? (
            <Empty>No charts fount.</Empty>
          ) : (
            <table className="table">
              <tbody>
                {result.charts.map(d => (
                  <Item
                    key={d.id}
                    title={d.title}
                    subtitle={`@${d.slug}`}
                    description={d.description}
                    link={`/charts/${d.id}`}
                    linkLabel={'View Chart'}
                  />
                ))}
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
    </>
  )
}
