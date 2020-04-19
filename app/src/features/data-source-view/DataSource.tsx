import React, { useState, useEffect } from 'react'
import { X } from 'react-feather'
import { search } from 'jmespath'
import { DataQuery } from './DataQuery'
import './DataSource.scss'

export function DataSource({ input, data, setData }: any) {
  const { request, query } = data
  const { url, headers } = request
  const setQuery = (q: any) => setData({ ...data, query: q })
  const setUrl = (u: any) => {
    data.request.url = u
    setData(data)
  }
  const addNewHeader = () => {
    data.request.headers.push({ key: '', value: '' })
    setData(data)
  }
  const removeHeader = (index: any) => {
    if (index > -1) {
      data.request.headers.splice(index, 1)
      setData(data)
    }
  }
  const setHeader = (index: any, header: any) => {
    data.request.headers[index] = header
    setData(data)
  }
  const [output, setOutput] = useState('')
  const stringify = (s: any) => JSON.stringify(s, null, 4)
  const parse = (s: any) => JSON.parse(s)

  useEffect(() => {
    if (input) {
      try {
        setOutput(stringify(search(parse(input), query)))
      } catch (e) {
        setOutput('')
      }
    }
  }, [input, query])

  return (
    <>
      <div className="row my-3 data-source">
        <div className="col">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '70px' }}>
                  <b>URL:</b>
                </td>
                <td>
                  <input
                    className="form-control"
                    value={url}
                    onChange={(evt) => setUrl(evt.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: '100%' }}>
            <tbody>
              {headers.map((header: any, index: any) => {
                const { key, value } = header
                return (
                  <tr>
                    <td style={{ width: '70px' }}>
                      <b>Header:</b>
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={key}
                        onChange={(evt) =>
                          setHeader(index, { key: evt.target.value, value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={value}
                        onChange={(evt) =>
                          setHeader(index, { key, value: evt.target.value })
                        }
                      />
                    </td>
                    <td style={{ width: '15px' }}>
                      <button
                        title="Remove"
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => removeHeader(index)}
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <button
                    title="Add Header"
                    type="button"
                    className="btn btn-primary"
                    onClick={addNewHeader}
                  >
                    Add Header
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <DataQuery
        input={input}
        output={output}
        query={query}
        setQuery={setQuery}
      />
    </>
  )
}
