import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../Content'
import { AppContext } from '../../common/context/AppContext'
import './Navbar.scss'

export function NavBar() {
  const [appState] = useContext(AppContext)

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          {content.metadata.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <ul className="navbar-nav px-3">
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
                  href="#"
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
                  <Link className="dropdown-item" to="/">
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
