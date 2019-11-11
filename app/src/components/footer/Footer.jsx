import React from 'react'
import { FooterNav } from './FooterNav'
import { content } from '../../content/content'
import './Footer.scss'

export function Footer() {
  return (
    <footer>
      <FooterNav />
      <div className="col-12 col-md">
        <h3>blicc.org</h3>
        <small className="d-block mb-3 text-muted">
          <p> {`${content.en.copyright} ${new Date().getFullYear()}`}</p>
        </small>
      </div>
    </footer>
  )
}
