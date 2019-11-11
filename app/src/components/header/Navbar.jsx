import React, { useContext, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { useContent } from '../../hooks/useContent'
import { ReactComponent as Burger } from '../../assets/img/Burger.svg'
import { ReactComponent as Maskot } from '../../assets/img/Maskot.svg'
import { NavbarCreate } from './NavbarCreate'
import { NavbarMenu } from './NavbarMenu'
import { NavbarUser } from './NavbarUser'
import './Navbar.scss'

export function NavBar({ toggleMenu }) {
  const content = useContent()
  const [appState] = useContext(AppContext)
  const { firstName, lastName, loggedIn } = appState
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
        <Link className="navbar-brand p-1" style={style} to="/">
          <Maskot className="maskot" />
          <div className="title">{content.title} </div>
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
              loggedIn={loggedIn}
              logout={logout}
            />
          </ul>
        </div>
      </nav>
    </>
  )
}
