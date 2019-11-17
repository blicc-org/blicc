import React from 'react'
import { FooterNav } from './FooterNav'
import { LanguageSelect } from '../language-select/LanguageSelect'
import { useLanguage } from '../../hooks'

export function Footer() {
  const content = useLanguage()

  return (
    <footer>
      <FooterNav />
      <div className="m-3">
        <LanguageSelect />
      </div>
      <div className="m-3">
        <h3>blicc.org</h3>
        <small className="d-block mb-3 text-muted">
          <p> {`${content.copyright} ${new Date().getFullYear()}`}</p>
        </small>
      </div>
    </footer>
  )
}
