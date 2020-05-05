import React, { useState, useEffect, useRef, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { useEndpoint, useMobile, useLanguage } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { API, EXAMPLE_DATA } from '../../config'
import { ChartDetails } from './ChartDetails'
import './ChartView.scss'

export function ChartView({ match }: any): ReactElement {
  const content = useLanguage()
  const path = `/charts/${match.params.id}`
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [, access] = useEndpoint(path)
  const [chart, setChart] = useState({
    title: undefined,
    description: undefined,
    bundle: undefined,
    creationDate: undefined,
    slug: undefined,
    key: '',
  })
  const { title, description, bundle, creationDate, slug, key } = chart
  const style = {
    width: '100%',
    height: isMobile ? '300px' : '500px',
  }

  const data = EXAMPLE_DATA

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, chart] = await access()
      if (status === statusCode.OK) {
        setChart(chart)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  useEffect(() => {
    async function fetchPlugin(): Promise<void> {
      await import(
        /*webpackIgnore: true*/ `${API.ORIGIN}/bundles/${slug}`
      ).then((module) => {
        const node = module[key](
          data,
          () => {},
          {},
          () => {}
        )

        if (ref.current) {
          ref.current.innerHTML = ''
          if (typeof node === 'string') {
            ref.current.innerHTML = node
          } else {
            ref.current.appendChild(node)
          }
        }
      })
    }
    if (slug && key) {
      fetchPlugin()
    }
    // eslint-disable-next-line
  }, [slug])

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{title}</h2>
        </div>
        <div className="col px-0 pb-2">
          <div className="card">
            <h5 className="card-header">{content.preview}</h5>
            <div className="card-body">
              <div style={style} ref={ref} />
            </div>
          </div>
        </div>
        <ChartDetails
          bundle={bundle}
          description={description}
          creationDate={creationDate}
        />
      </div>
    </>
  )
}
