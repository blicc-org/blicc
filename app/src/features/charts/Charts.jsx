import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { useApiEndpoint, useLanguage } from '../../common/hooks'
import { Item, Pagination, Empty } from '../../common/components/ui'

export function Charts() {
  const content = useLanguage()
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
        title={content.charts.title}
        description={content.charts.description}
        path={'/charts'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{content.charts.title}</h2>
        </div>
        <div className="chart-list">
          {result.total === 0 ? (
            <Empty>{content.charts.empty}</Empty>
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
                    linkLabel={content.charts.view}
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
