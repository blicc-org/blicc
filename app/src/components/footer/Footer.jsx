import React from 'react'
import FooterLogo from './FooterLogo'
import FooterNav from './footer-nav/FooterNav'

export default function Footer() {
  return (
    <>
      <hr />
      <footer className="col-lg-12 col-xl-8 offset-xl-2 py-5">
        <div className="row">
          <FooterLogo />
          <FooterNav />
        </div>
      </footer>
    </>
  )
}
