import React, { useRef, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tabs } from '../../common/components/ui'
import { useMobile } from '../../common/hooks'
import { useJsonHighlighter } from '../../common/hooks'
import './DataQuery.scss'

export function DataQuery({ input, output, query, setQuery }: any) {
  const isMobile = useMobile()
  const highlighter = useJsonHighlighter()
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  const tabs = ['Result from API fetch', 'Queried Data']
  const [currentTab, setCurrentTab] = useState(tabs[0])

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

  function HighlightedJson({ children }: any) {
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
            rows={3}
            value={query}
            onChange={(evt) => setQuery(evt.target.value)}
          />
        </div>
      </div>
      {isMobile && (
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      <div className="my-3 code-container" ref={ref}>
        {isMobile ? (
          <>
            <div style={{ width: '100%' }}>
              {currentTab === tabs[0] ? (
                <HighlightedJson>{input}</HighlightedJson>
              ) : (
                <HighlightedJson>{output}</HighlightedJson>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="pr-2 item" style={{ width }}>
              <HighlightedJson>{input}</HighlightedJson>
            </div>
            <div className="pl-2 item" style={{ width }}>
              <HighlightedJson>{output}</HighlightedJson>
            </div>
          </>
        )}
      </div>
    </>
  )
}
