import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../Content'
import { AppContext } from '../../common/context/AppContext'
import { useApiEndpoint } from '../../common/hooks/useApiEndpoint'
import { API_URL } from '../../config'
import { NavbarUser } from './NavbarUser'
import { NavbarDashboard } from './NavbarDashboard'

export function NavBar() {
  const [appState, setAppState] = useContext(AppContext)
  const [, , , closeSession] = useApiEndpoint(`${API_URL}/sessions`)
  const { firstName, lastName, loggedIn } = appState

  async function logout() {
    const [status] = await closeSession()
    if (status === 205) {
      setAppState({ ...appState, loggedIn: false })
    }
  }

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
          <NavbarDashboard amount={27} />
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
