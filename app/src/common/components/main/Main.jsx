import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../../context'
import { useMobile, useInstalled, useAutoLogout } from '../../hooks'
import { sidebarWidth } from '../../../config'
import './Main.scss'

export function Main({ children }) {
  const [sidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  const [style, setStyle] = useState({})
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  useAutoLogout()

  useEffect(() => {
    setStyle({
      marginLeft: open && !isMobile ? sidebarWidth : 0,
      minHeight: '100vh',
      paddingBottom: isMobile && isInstalled ? '48px' : '0px',
    })
  }, [open, isMobile, isInstalled])

  return <main style={style}>{children}</main>
}
