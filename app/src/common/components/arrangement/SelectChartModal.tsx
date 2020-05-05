import React, { useState, useEffect, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { useEndpoint } from '../../hooks'

export function SelectChartModal({ cancel, submit }: any): ReactElement {
  const maxNumberOfResults = 10
  const [result, setResult] = useState({ total: 0, charts: [] })
  const [, access, ,] = useEndpoint('/charts')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, data] = await access({
        params: {
          search: searchTerm,
          take: maxNumberOfResults,
        },
      })
      if (status === statusCode.OK) {
        setResult(data)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [searchTerm])

  function onSelect(event: any, slug: string, key: string): void {
    event.preventDefault()
    submit(slug + '/' + key)
  }

  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select a chart type</h5>
            <button
              title="Close modal"
              onClick={cancel}
              type="button"
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              type="text"
              placeholder="Like Pie Chart..."
              onChange={(evt): void => setSearchTerm(evt.target.value)}
            ></input>
            <div className="pt-3">
              <ul>
                {result.charts.map(({ id, title, slug, key }) => (
                  <li key={id}>
                    <h5>
                      <a
                        href="/"
                        onClick={(evt): void => onSelect(evt, slug, key)}
                      >
                        {title}
                      </a>
                      <small className="text-muted">{` @${slug}`}</small>
                    </h5>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <h6>
              Results <small>{`${result.total} found.`}</small>
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}
