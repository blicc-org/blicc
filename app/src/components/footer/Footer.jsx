import React, { useContext, useState, useEffect } from 'react'
import { MenuContext } from '../../context/MenuContext'
import { FooterLogo } from './FooterLogo'
import { FooterNav } from './footer-nav/FooterNav'
import './Footer.scss'

export function Footer() {
  const [menuState] = useContext(MenuContext)
  const { open } = menuState
  const [left, setLeft] = useState(0)

  useEffect(() => {
    setLeft(open ? 250 : 0)
  }, [open])

  return (
    <footer style={{ marginLeft: left }}>
      <hr />
      <div className="col-lg-12 col-xl-8 offset-xl-2 py-5">
        <div className="row">
          <FooterLogo />
          <FooterNav />
        </div>
      </div>
    </footer>
  )
}
