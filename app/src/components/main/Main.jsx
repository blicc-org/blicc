import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../../context/SidebarContext'
import theme from '../../config/Theme.scss'
import './Main.scss'

export function Main({ children }) {
  const [sidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  const [left, setLeft] = useState(0)

  useEffect(() => {
    setLeft(open ? theme.sidebarSize : 0)
  }, [open])

  return <main style={{ marginLeft: left }}>{children}</main>
}
