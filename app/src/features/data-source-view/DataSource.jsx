import React, { useState, useEffect } from 'react'
import { search } from 'jmespath'
import { Card } from '../../common/components/ui'
import { useDeliveryEndpoint } from '../../common/hooks'
import { Highlighter } from '../../common/components/syntax-highlighting/Highlighter'

export function DataSource({ id, data, setData }) {
  const { url, query } = data
  const setQuery = q => setData({ ...data, query: q })
  const setUrl = u => setData({ ...data, url: u })
  const [publish, subscribe] = useDeliveryEndpoint()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    subscribe(id, str => setInput(JSON.stringify(JSON.parse(str), null, 4)))
    if (url) publish(url)
  }, [id, url, setInput])

  useEffect(() => {
    if (input) {
      try {
        setOutput(JSON.stringify(search(JSON.parse(input), query), null, 4))
      } catch (e) {
        setOutput('')
      }
    }
  }, [input, query])

  return (
    <>
      <Card title="Url">
        <h3>Url: </h3>
        <input
          className="form-control col-md-4"
          value={url}
          onChange={evt => setUrl(evt.target.value)}
        />
      </Card>
      <Card title="Fetched Result">
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                className="form-control "
                value={query}
                onChange={evt => setQuery(evt.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Highlighter
                language="jsx"
                value={input}
                displayCopyButton={false}
              />
            </div>
            <div className="col">
              <Highlighter
                language="jsx"
                value={output}
                displayCopyButton={false}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
