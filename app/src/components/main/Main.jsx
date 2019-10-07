import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../../context/SidebarContext'
import { useDimensions } from '../../hooks/useDimensions'
import { sidebarWidth } from '../../config/gui'
import './Main.scss'

export function Main({ children }) {
  const [sidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  const [style, setStyle] = useState({})
  const isMobile = useDimensions()

  useEffect(() => {
    setStyle({
      marginLeft: open && !isMobile ? sidebarWidth : 0,
    })
  }, [open, isMobile])

  return <main style={style}>{children}</main>
}
