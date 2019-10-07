import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../config/language/english'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { NavbarUser } from './NavbarUser'
import { ReactComponent as Menu } from './Menu.svg'
import theme from '../../config/Theme.scss'
import './Navbar.scss'

export function NavBar({ toggleMenu }) {
  const [appState] = useContext(AppContext)
  const { firstName, lastName, loggedIn } = appState
  const [, logout] = useSession()

  const style = {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '1rem',
  }

  return (
    <>
      <nav className="navbar navbar-expand fixed-top navbar-dark bg-dark p-0">
        <div
          className="menu-button nav-link pl-4 pr-3 py-2"
          style={{ marginBottom: '2px' }}
          onClick={toggleMenu}
        >
          <Menu style={{ fill: theme.secondary }} />
        </div>
        <Link className="navbar-brand pl-1 mx-0" style={style} to="/">
          {content.metadata.title}
        </Link>
        <div
          className="collapse navbar-collapse px-3"
          id="navbarSupportedContent"
        >
          <NavbarUser
            firstName={firstName}
            lastName={lastName}
            loggedIn={loggedIn}
            logout={logout}
          />
        </div>
      </nav>
      <div style={{ height: '40px' }}></div>
    </>
  )
}
