import React, { useContext, ReactElement } from 'react'
import { SidebarContext } from '../../context'
import { NavBar } from './Navbar'
import { Sidebar } from '../sidebar/Sidebar'

export function Header(): ReactElement {
  const [sidebarState, setSidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  return (
    <header>
      <NavBar
        toggleMenu={(): void =>
          setSidebarState({ ...sidebarState, open: !open })
        }
      />
      <Sidebar open={open} />
    </header>
  )
}
