import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../../context/SidebarContext'
import { FooterLogo } from './FooterLogo'
import { FooterNav } from './footer-nav/FooterNav'
import { useDimensions } from '../../hooks/useDimensions'
import { sidebarWidth } from '../../config/gui'
import './Footer.scss'

export function Footer() {
  const [sidebarState] = useContext(SidebarContext)
  const [style, setStyle] = useState({})
  const isMobile = useDimensions()
  const { open } = sidebarState

  useEffect(() => {
    setStyle({ marginLeft: open && !isMobile ? sidebarWidth : 0 })
  }, [open])

  return (
    <footer style={style}>
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
