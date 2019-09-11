import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Markdown from 'react-markdown'
import { Highlighter } from '../../components/syntax-highlighting/Highlighter'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'
import { APP_URL } from '../../config'
import './Wiki.scss'

export function Wiki({ location }) {
  const [text, setText] = useState('')
  let { pathname } = location

  useLayoutEffect(() => {
    async function getText() {
      const { data } = await axios.get(
        `${APP_URL}${pathname.replace('/wiki', '')}`
      )
      setText(data)
    }
    getText()
  }, [pathname, location])

  return (
    <>
      <Header />
      <div className="container py-5 wiki">
        <Markdown
          source={text}
          renderers={{
            code: Highlighter,
            link: ({ href, children }) => (
              <Link onClick={() => setText('')} to={`/wiki/${href}`}>
                {children}
              </Link>
            ),
          }}
        />
      </div>
      <Footer />
    </>
  )
}