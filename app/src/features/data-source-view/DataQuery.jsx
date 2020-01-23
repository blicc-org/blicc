import React, { useRef, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useJsonHighlighter } from '../../common/hooks'

export function DataQuery({ input, output, query, setQuery }) {
  const highlighter = useJsonHighlighter()
  const ref = useRef()
  const [width, setWidth] = useState(0)

  function updateSize() {
    if (ref.current) {
      setWidth(ref.current.offsetWidth / 2)
    }
  }

  useLayoutEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  function HighlightedJson({ children }) {
    const highlighted = highlighter(children)
    return (
      <p className="code" dangerouslySetInnerHTML={{ __html: highlighted }} />
    )
  }

  return (
    <>
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
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            rows="3"
            value={query}
            onChange={evt => setQuery(evt.target.value)}
          />
        </div>
      </div>
      <div className="my-3 code-container" ref={ref}>
        <div className="pr-2 item" style={{ width }}>
          <HighlightedJson>{input}</HighlightedJson>
        </div>
        <div className="pl-2 item" style={{ width }}>
          <HighlightedJson>{output}</HighlightedJson>
        </div>
      </div>
    </>
  )
}
