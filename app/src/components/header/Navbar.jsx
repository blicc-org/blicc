import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../language/Content'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { NavbarUser } from './NavbarUser'
import { Menu } from 'react-feather'

export function NavBar({ toggleMenu }) {
  const [appState] = useContext(AppContext)
  const { firstName, lastName, loggedIn } = appState
  const [, logout] = useSession()

  const styles = {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '1rem',
  }

  return (
    <>
      <nav className="navbar navbar-expand fixed-top navbar-dark bg-dark p-0">
        <a className="pl-4 pr-2 py-2" onClick={toggleMenu}>
          <Menu className="feather text-light" />
        </a>
        <Link className="navbar-brand pl-1 mx-0" style={styles} to="/">
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
