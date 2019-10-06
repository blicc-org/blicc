import React, { useContext } from 'react'
import { MenuContext } from '../../context/MenuContext'
import { NavBar } from './Navbar'
import { Menu } from '../menu/Menu'

export function Header() {
  const [menuState, setMenuState] = useContext(MenuContext)
  const { open } = menuState
  return (
    <header>
      <NavBar toggleMenu={() => setMenuState({ ...menuState, open: !open })} />
      <Menu open={open} />
    </header>
  )
}
