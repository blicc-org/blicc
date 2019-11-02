import React, { useContext, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { content } from '../../config/language/english'
import { ReactComponent as Burger } from './Burger.svg'
import { NavbarCreate } from './NavbarCreate'
import { NavbarMenu } from './NavbarMenu'
import { NavbarUser } from './NavbarUser'
import './Navbar.scss'

export function NavBar({ toggleMenu }) {
  const [appState] = useContext(AppContext)
  const { firstName, lastName } = appState
  const [, logout] = useSession()
  const [width, setWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const style = {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '1rem',
  }

  return (
    <>
      <nav
        className="navbar navbar-expand fixed-top navbar-dark bg-dark p-0"
        style={{ width }}
      >
        <div
          className="menu-button nav-link pl-4 pr-3 py-2"
          style={{ marginBottom: '2px' }}
          onClick={toggleMenu}
        >
          <Burger className="burger" />
        </div>
        <Link className="navbar-brand pl-1 mx-0" style={style} to="/">
          {content.metadata.title}
        </Link>
        <div
          className="collapse navbar-collapse px-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <NavbarCreate />
            <NavbarMenu />
            <NavbarUser
              firstName={firstName}
              lastName={lastName}
              logout={logout}
            />
          </ul>
        </div>
      </nav>
    </>
  )
}
