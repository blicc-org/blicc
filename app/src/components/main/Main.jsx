import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../../context/SidebarContext'
import { useDimensions } from '../../hooks/useDimensions'
import { sidebarWidth, breakpoints } from '../../config/gui'
import './Main.scss'

export function Main({ children }) {
  const [sidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  const [style, setStyle] = useState({})
  const [width] = useDimensions()

  useEffect(() => {
    const isMobile = breakpoints.md > width
    setStyle({
      marginLeft: open && !isMobile ? sidebarWidth : 0,
    })
  }, [open, width])

  return <main style={style}>{children}</main>
}
