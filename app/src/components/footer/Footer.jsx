import React from 'react'
import { FooterNav } from './FooterNav'
import { FooterLanguageSelect } from './FooterLanguageSelect'
import { useContent } from '../../hooks/useContent'

export function Footer() {
  const content = useContent()

  return (
    <footer>
      <FooterNav />
      <FooterLanguageSelect />
      <div className="m-3">
        <h3>blicc.org</h3>
        <small className="d-block mb-3 text-muted">
          <p> {`${content.copyright} ${new Date().getFullYear()}`}</p>
        </small>
      </div>
    </footer>
  )
}
