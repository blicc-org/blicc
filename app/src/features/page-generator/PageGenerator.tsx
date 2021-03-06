import React, { useState, useEffect, useContext, ReactElement } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Markdown from 'react-markdown'
import { Highlighter } from '../../common/components/syntax-highlighting/Highlighter'
import { APP } from '../../config'
import { AppContext } from '../../common/context'
import './PageGenerator.scss'

export function PageGenerator({ location }: any): ReactElement {
  const [appState] = useContext(AppContext)
  const [text, setText] = useState('')
  const [notFound, setNotFound] = useState(false)
  let { pathname } = location
  if (pathname.charAt(pathname.length - 1) === '/') {
    pathname = pathname.substring(0, pathname.length - 1)
  }

  useEffect(() => {
    async function getText(): Promise<void> {
      try {
        const response = await fetch(
          `${APP.ORIGIN}${pathname}.${appState.language}.md`
        )
        setText(await response.text())
      } catch (e) {
        setNotFound(true)
      }
    }
    getText()
  }, [pathname, appState])

  return (
    <>
      {notFound && <Redirect to={'/not-found'} />}
      <div className="container pages my-3">
        <Markdown
          source={text}
          renderers={{
            code: Highlighter,
            link: ({ href, children }: any): ReactElement => (
              <Link onClick={(): void => setText('')} to={`/pages/${href}`}>
                {children}
              </Link>
            ),
          }}
        />
      </div>
    </>
  )
}
