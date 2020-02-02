import React, { useState, useEffect } from 'react'
import { search } from 'jmespath'
import { DataQuery } from './DataQuery'

export function DataSource({ input, data, setData }) {
  const { url, query } = data
  const setQuery = q => setData({ ...data, query: q })
  const setUrl = u => setData({ ...data, url: u })
  const [output, setOutput] = useState('')
  const stringify = s => JSON.stringify(s, null, 4)
  const parse = s => JSON.parse(s)

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
      <div className="row my-3">
        <div className="col">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '150px' }}>
                  <b>Fetch data from api:</b>
                </td>
                <td>
                  <input
                    className="form-control"
                    value={url}
                    onChange={evt => setUrl(evt.target.value)}
                  />
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
