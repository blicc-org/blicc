import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { useApiEndpoint } from '../../hooks'

export function PluginSelectorModal({ cancel, submit }) {
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
            ></input>
            <div className="plugin-results">
              <ul>
                {result.charts
                  .slice(1, 3)
                  .map(({ id, title, bundle, description }) => (
                    <li key={id}>
                      <h4>{title}</h4>
                      <p>{bundle}</p>
                      <p>{description}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={cancel}
              type="button"
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
            <button onClick={submit} type="button" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
