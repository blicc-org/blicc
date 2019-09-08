import React, { useState, useLayoutEffect } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import { Highlighter } from '../../components/syntax-highlighting/Highlighter'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'
import { APP_URL } from '../../config'

export function Docs() {
  const [text, setText] = useState('')

  useLayoutEffect(() => {
    async function getText() {
      const { data } = await axios.get(`${APP_URL}/README.md`)
      setText(data)
    }
    getText()
  }, [])

  return (
    <>
      <Header />
      <main role="main">
        <div className="container py-5">
          <Markdown source={text} renderers={{ code: Highlighter }} />
        </div>
      </main>
      <Footer />
    </>
  )
}
