import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../Content'
import { AppContext } from '../../common/context/AppContext'
import { useApiEndpoint } from '../../common/hooks/useApiEndpoint'
import { API_URL } from '../../config'
import './Navbar.scss'

export function NavBar() {
  const [appState, setAppState] = useContext(AppContext)
  const [, , , closeSession] = useApiEndpoint(`${API_URL}/sessions`)

  async function logout() {
    const [status] = await closeSession()
    if (status === 205) {
      setAppState({ ...appState, loggedIn: false })
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand fixed-top navbar-dark bg-dark p-0">
        <Link className="navbar-brand pl-3 mx-0" to="/">
          {content.metadata.title}
        </Link>
        <div
          className="collapse navbar-collapse px-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item text-nowrap">
              <Link className="nav-link" to="/login">
                Collections
              </Link>
            </li>
            <li className="nav-item text-nowrap">
              <Link className="nav-link" to="/login">
                Dashboards
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!appState.loggedIn ? (
              <li className="nav-item text-nowrap">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {`Hello ${appState.firstName} ${appState.lastName} `}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={() => logout()}
                  >
                    Logout
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="moveUnderNavBar" />
    </>
  )
}
