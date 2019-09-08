import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Markdown from 'react-markdown'
import { Highlighter } from '../../components/syntax-highlighting/Highlighter'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'
import { APP_URL } from '../../config'

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
  }, [location])

  function handleHashChange(e) {
    console.log(e)
  }

  useLayoutEffect(() => {
    window.addEventListener('hashchange', handleHashChange, false)
    return window.removeEventListener('hashchange', handleHashChange, false)
  }, [])

  return (
    <>
      <Header />
      <main role="main">
        <div className="container py-5">
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
      </main>
      <Footer />
    </>
  )
}
