import React, { useState, useRef } from 'react'
import { useLanguage, useClickAway } from '../../hooks'
import { Link } from 'react-router-dom'
import { User } from 'react-feather'
import { useLogout } from '../../hooks/useLogout'

export function NavbarUser({ firstName, lastName, loggedIn }) {
  const content = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const logout = useLogout()
  useClickAway(ref, () => close())

  function toggle() {
    setOpen(prevState => !prevState)
  }

  function close() {
    setOpen(false)
  }

  return (
    <>
      {loggedIn ? (
        <li ref={ref} className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={event => {
              event.preventDefault()
              toggle()
            }}
          >
            <User className="user" size={24}></User>
          </a>
          <div
            className={`dropdown-menu dropdown-menu-right ${
              open ? 'show' : ''
            }`}
            aria-labelledby="navbarDropdown"
          >
            <h6 className="dropdown-header">{`${content.navbar.welcome} ${firstName} ${lastName}`}</h6>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/profile" onClick={close}>
              {content.navbar.profile}
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={async () => {
                await logout()
                close()
              }}
            >
              {content.navbar.logout}
            </Link>
          </div>
        </li>
      ) : (
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="/login">
            {content.navbar.signin}
          </Link>
        </li>
      )}
    </>
  )
}
