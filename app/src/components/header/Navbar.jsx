import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../language/Content'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { NavbarUser } from './NavbarUser'
import { NavbarDashboard } from './NavbarDashboard'

export function NavBar() {
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
        <Link className="navbar-brand pl-3 mx-0" style={styles} to="/">
          {content.metadata.title}
        </Link>
        <div
          className="collapse navbar-collapse px-3"
          id="navbarSupportedContent"
        >
          <NavbarDashboard loggedIn={loggedIn} amount={27} />
          <NavbarUser
            firstName={firstName}
            lastName={lastName}
            loggedIn={loggedIn}
            logout={logout}
          />
        </div>
      </nav>
      <div className="moveUnderNavBar" />
    </>
  )
}
