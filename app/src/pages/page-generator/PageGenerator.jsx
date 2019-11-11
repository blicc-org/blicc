import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Markdown from 'react-markdown'
import { Highlighter } from '../../components/syntax-highlighting/Highlighter'
import { APP } from '../../config'
import './PageGenerator.scss'

export function PageGenerator({ location }) {
  const [text, setText] = useState('')
  const [notFound, setNotFound] = useState(false)
  let { pathname } = location

  useEffect(() => {
    async function getText() {
      try {
        const { data } = await axios.get(`${APP.ORIGIN}${pathname}.en.md`)
        setText(data)
      } catch (e) {
        setNotFound(true)
      }
    }
    getText()
  }, [pathname, location])

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
