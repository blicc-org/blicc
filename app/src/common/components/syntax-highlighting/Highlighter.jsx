import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import syntaxColors from './syntaxColors.js'
import './Highlighter.scss'
import theme from '../../../Theme.scss'

export function Highlighter({ language, value }) {
  function copy() {
    const el = document.createElement('textarea')
    el.value = value
    el.setAttribute('readonly', '')
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  return (
    <>
      <div className="container-fluid syntax-highlighter p-0">
        <SyntaxHighlighter
          id="code"
          className="highlighter p-3"
          customStyle={{ borderRadius: theme.borderRadius }}
          language={language || 'text'}
          style={syntaxColors}
        >
          {value}
        </SyntaxHighlighter>
        <button
          title="Copy source code"
          className="btn btn-sm btn-link btn-copy"
          onClick={() => copy()}
        >
          Copy
        </button>
      </div>
    </>
  )
}
