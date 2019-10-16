import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Markdown from 'react-markdown'
import { Highlighter } from '../../../components/syntax-highlighting/Highlighter'
import { APP } from '../../../config/env'
import './PageGenerator.scss'

export function PageGenerator({ location }) {
  const [text, setText] = useState('')
  let { pathname } = location

  useEffect(() => {
    async function getText() {
      const { data } = await axios.get(
        `${APP.ORIGIN}${pathname.replace('/pages', '')}`
      )
      setText(data)
    }
    getText()
  }, [pathname, location])

  return (
    <>
      <div className="container py-5 pages">
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
