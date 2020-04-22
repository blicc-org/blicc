import React, { useEffect, useState, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { MetaData } from '../../common/components/meta-data/MetaData'
import {
  useApiEndpoint,
  useLanguage,
  useDateFormatter,
} from '../../common/hooks'
import { Pagination, Listing, Item, Heading } from '../../common/components/ui'
import { List, Chart } from '../../common/interfaces'

export function Charts(): ReactElement {
  const [, access, ,] = useApiEndpoint('/charts')
  const [list, setList] = useState<List<Chart>>()
  const { charts: text } = useLanguage()
  const itemsPerPage = 10
  const [page, setPage] = useState(0)
  const format = useDateFormatter()

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, data] = await access({
        params: {
          skip: itemsPerPage * page,
          take: itemsPerPage,
        },
      })
      if (status === statusCode.OK) {
        setList({ total: data.total, list: data.charts })
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [page])

  return (
    <>
      <MetaData
        title={text.title}
        description={text.description}
        path={'/charts'}
      />
      <div className="container">
        <Heading title={text.title} />
        <Listing<Chart> list={list} emptyText={text.empty}>
          {(chart) => (
            <Item
              key={chart.id}
              title={chart.title}
              subtitle={format(chart.creationDate)}
              description={chart.description}
              link={`/charts/${chart.id}`}
              linkLabel={text.view}
              badge={`@${chart.slug}`}
            />
          )}
        </Listing>
        <Pagination
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          total={list ? list.total : 0}
        />
      </div>
    </>
  )
}
