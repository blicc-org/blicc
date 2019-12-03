import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../hooks'

export function PluginSelectorModal({ cancel, submit }) {
  const maxNumberOfResults = 10
  const [result, setResult] = useState({ total: 0, charts: [] })
  const [, access, ,] = useApiEndpoint('/charts')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchData() {
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

  function onSelect(event, slug) {
    event.preventDefault()
    submit(slug)
  }

  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select a chart type</h5>
            <button onClick={cancel} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              type="text"
              placeholder="Like Pie Chart..."
              onChange={event => setSearchTerm(event.target.value)}
            ></input>
            <div className="pt-3">
              <ul>
                {result.charts.map(({ id, title, slug }) => (
                  <li key={id}>
                    <h5>
                      <a href="/" onClick={event => onSelect(event, slug)}>
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
