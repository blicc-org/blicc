import React, { useState } from 'react'
import { FooterNav } from './FooterNav'
import { content } from '../../content/content'

export function Footer() {
  const languages = ['german', 'english']
  const [language, setLanguage] = useState()

  return (
    <footer>
      <FooterNav />
      <div className="m-3">
        <select className="form-control form-control-sm">
          {languages.map(lg => {
            return <option key={lg}>{lg}</option>
          })}
        </select>
      </div>
      <div className="m-3">
        <h3>blicc.org</h3>
        <small className="d-block mb-3 text-muted">
          <p> {`${content.en.copyright} ${new Date().getFullYear()}`}</p>
        </small>
      </div>
    </footer>
  )
}
