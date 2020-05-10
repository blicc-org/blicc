import React, { useState, useEffect, ReactElement } from 'react'
import { X } from 'react-feather'
import { search } from 'jmespath'
import { DataQuery } from './DataQuery'
import './DataSource.scss'

export function DataSource({
  isFullscreen,
  input,
  data,
  setData,
}: any): ReactElement {
  const style: any = isFullscreen
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        padding: '25px',
        backgroundColor: 'white',
      }
    : {}
  const { request, query } = data
  const { url, headers } = request
  const setQuery = (q: any): void => setData({ ...data, query: q })
  const setUrl = (u: any): void => {
    data.request.url = u
    setData(data)
  }
  const addNewHeader = (): void => {
    data.request.headers.push({ key: '', value: '' })
    setData(data)
  }
  const removeHeader = (index: any): void => {
    if (index > -1) {
      data.request.headers.splice(index, 1)
      setData(data)
    }
  }
  const setHeader = (index: any, header: any): void => {
    data.request.headers[index] = header
    setData(data)
  }
  const [output, setOutput] = useState('')
  const stringify = (s: any): string => JSON.stringify(s, null, 4)
  const parse = (s: any): void => JSON.parse(s)

  useEffect((): void => {
    if (input) {
      try {
        setOutput(stringify(search(parse(input), query)))
      } catch (e) {
        setOutput('')
      }
    }
  }, [input, query])

  return (
    <div style={style}>
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
                    onChange={(evt): void => setUrl(evt.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: '100%' }}>
            <tbody>
              {headers.map(
                (header: any, index: any): ReactElement => {
                  const { key, value } = header
                  return (
                    <tr key={index}>
                      <td style={{ width: '70px' }}>
                        <b>Header:</b>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={key}
                          onChange={(evt): void =>
                            setHeader(index, { key: evt.target.value, value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={value}
                          onChange={(evt): void =>
                            setHeader(index, { key, value: evt.target.value })
                          }
                        />
                      </td>
                      <td style={{ width: '15px' }}>
                        <button
                          title="Remove"
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={(): void => removeHeader(index)}
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                }
              )}
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
    </div>
  )
}
