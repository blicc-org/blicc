import React, { useState, useEffect } from 'react'
import { search } from 'jmespath'
import { useDeliveryEndpoint } from '../../common/hooks'
import { DataQuery } from './DataQuery'
import './DataSource.scss'

export function DataSource({ id, data, setData }) {
  const { url, query } = data
  const setQuery = q => setData({ ...data, query: q })
  const setUrl = u => setData({ ...data, url: u })
  const [publish, subscribe, state] = useDeliveryEndpoint()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const stringify = s => JSON.stringify(s, null, 4)
  const parse = s => JSON.parse(s)
  const channel = `/forwarding/${id}`

  useEffect(() => {
    if (state === WebSocket.OPEN && url) {
      subscribe(channel, str => {
        setInput(stringify(str))
      })
      publish(channel, { url })
    }
    // eslint-disable-next-line
  }, [url, state])

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
