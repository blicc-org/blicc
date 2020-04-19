import React, { useContext } from 'react'
import { SidebarContext } from '../../context'
import { NavBar } from './Navbar'
import { Sidebar } from '../sidebar/Sidebar'

export function Header() {
  const [sidebarState, setSidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  return (
    <header>
      <NavBar
        toggleMenu={() => setSidebarState({ ...sidebarState, open: !open })}
      />
      <Sidebar open={open} />
    </header>
  )
}
