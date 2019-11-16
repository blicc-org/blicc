import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Markdown from 'react-markdown'
import { Highlighter } from '../../common/components/syntax-highlighting/Highlighter'
import { APP } from '../../config'
import { AppContext } from '../../common/context/AppContext'
import './PageGenerator.scss'

export function PageGenerator({ location }) {
  const [appState] = useContext(AppContext)
  const [text, setText] = useState('')
  const [notFound, setNotFound] = useState(false)
  let { pathname } = location

  useEffect(() => {
    async function getText() {
      try {
        const { data } = await axios.get(
          `${APP.ORIGIN}${pathname}.${appState.language}.md`
        )
        setText(data)
      } catch (e) {
        setNotFound(true)
      }
    }
    getText()
  }, [pathname, appState])

  return (
    <>
      {notFound && <Redirect to={'/not-found'} />}
      <div className="container px-5 py-5 pages">
        <Markdown
          source={text}
          renderers={{
            code: Highlighter,
            link: ({ href, children }) => (
              <Link onClick={() => setText('')} to={`/pages/${href}`}>
                {children}
              </Link>
            ),
          }}
        />
      </div>
    </>
  )
}
