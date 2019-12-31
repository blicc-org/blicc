import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../hooks'

export function SelectDataSourceModal({ cancel, submit }) {
  const maxNumberOfResults = 10
  const [result, setResult] = useState({ total: 0, dataSources: [] })
  const [, access, ,] = useApiEndpoint('/data-sources')
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

  function onSelect(event, id) {
    event.preventDefault()
    submit(id)
  }

  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select a data source</h5>
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
              onChange={event => setSearchTerm(event.target.value)}
            ></input>
            <div className="pt-3">
              <ul>
                {result.dataSources.map(({ id, title }) => (
                  <li key={id}>
                    <h5>
                      <a href="/" onClick={event => onSelect(event, id)}>
                        {title}
                      </a>
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
