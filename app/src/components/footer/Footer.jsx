import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../../context/SidebarContext'
import { FooterLogo } from './FooterLogo'
import { FooterNav } from './footer-nav/FooterNav'
import theme from '../../config/Theme.scss'
import './Footer.scss'

export function Footer() {
  const [sidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  const [left, setLeft] = useState(0)

  useEffect(() => {
    setLeft(open ? theme.sidebarSize : 0)
  }, [open])

  return (
    <footer style={{ marginLeft: left }}>
      <hr className="mx-4" />
      <div className="col-lg-12 col-xl-8 offset-xl-2 py-5">
        <div className="row">
          <FooterLogo />
          <FooterNav />
        </div>
      </div>
    </footer>
  )
}
