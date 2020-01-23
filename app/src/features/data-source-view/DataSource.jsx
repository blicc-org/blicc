import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { search } from 'jmespath'
import { useDeliveryEndpoint, useJsonHighlighter } from '../../common/hooks'
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
  const highlighter = useJsonHighlighter()

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

  function HighlightedJson({ children }) {
    const highlighted = highlighter(children)
    return (
      <p className="code" dangerouslySetInnerHTML={{ __html: highlighted }} />
    )
  }

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
      <div className="row">
        <div className="col mt-3">
          <h4>Query your data</h4>
          <p>
            The data has to be transformed to be used inside the diagrams. This
            can be done with the help of <code>jmespath</code>, a json query
            language. Read more about how to query the data{' '}
            <Link to="/pages/docs/how-to-query-data">here</Link>.
          </p>
        </div>
      </div>
      <div className="row my-3">
        <div className="col">
          <textarea
            className="form-control"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            rows="3"
            value={query}
            onChange={evt => setQuery(evt.target.value)}
          />
        </div>
      </div>
      <div className="my-3 code-container">
        <div className="pr-2 item">
          <HighlightedJson>{input}</HighlightedJson>
        </div>
        <div className="pl-2 item">
          <HighlightedJson>{output}</HighlightedJson>
        </div>
      </div>
    </>
  )
}
