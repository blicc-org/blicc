import React from 'react'
import { FooterNav } from './FooterNav'
import { content } from '../../config/language/english'

export function Footer() {
  return (
    <footer>
      <FooterNav />
      <div className="col-12 col-md">
        <h3>blicc.org</h3>
        <small className="d-block mb-3 text-muted">
          <p> {`${content.metadata.copyright} ${new Date().getFullYear()}`}</p>
        </small>
      </div>
    </footer>
  )
}
