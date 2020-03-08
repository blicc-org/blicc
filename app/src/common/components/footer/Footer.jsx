import React from 'react'
import { FooterNav } from './FooterNav'
import { LanguageSelect } from '../language-select/LanguageSelect'
import { useLanguage } from '../../hooks'

export function Footer({ close }) {
  const content = useLanguage()

  return (
    <footer>
      <FooterNav close={close} />
      <div className="m-3">
        <LanguageSelect />
      </div>
      <div className="m-3">
        <h3>{content.brand}</h3>
        <small className="d-block mb-3 text-muted">
          <p>
            {' '}
            {`${
              content.copyright
            } © MIT ${new Date().getFullYear()}, Thilo Ilg`}
          </p>
        </small>
      </div>
    </footer>
  )
}
