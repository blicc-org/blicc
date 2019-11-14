import React from 'react'
import { FooterNav } from './FooterNav'
import { LanguageSelect } from '../language-select/LanguageSelect'
import { useContent } from '../../hooks/useContent'

export function Footer({ close }) {
  const content = useContent()

  return (
    <footer>
      <FooterNav close={close} />
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
