import React, { useContext, useState, useEffect } from 'react'
import { MenuContext } from '../../context/MenuContext'
import './Main.scss'

export function Main({ children }) {
  const [menuState] = useContext(MenuContext)
  const { open } = menuState
  const [left, setLeft] = useState(0)

  useEffect(() => {
    setLeft(open ? 250 : 0)
  }, [open])

  return <main style={{ marginLeft: left }}>{children}</main>
}
