import React, { useState, useRef } from 'react'
import { useLanguage, useClickAway } from '../../hooks'
import { Link } from 'react-router-dom'
import { User } from 'react-feather'
import { useLogout, useAdmin } from '../../hooks'
import { API } from '../../../config'

export function NavbarUser({ id, firstName, lastName, loggedIn }) {
  const [defaultIcon, setDefaultIcon] = useState(false)
  const content = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const logout = useLogout()
  const isAdmin = useAdmin()
  useClickAway(ref, () => close())

  function toggle() {
    setOpen((prevState) => !prevState)
  }

  function close() {
    setOpen(false)
  }

  return (
    <>
      {loggedIn ? (
        <div ref={ref} className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/"
            id="navbarDropdown"
            role="button"
            title="View user"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={(event) => {
              event.preventDefault()
              toggle()
            }}
          >
            {defaultIcon ? (
              <User className="user" size={24}></User>
            ) : (
              <img
                alt=""
                className="user"
                width={24}
                height={24}
                src={`${API.ORIGIN}/profile-pictures/${id}.jpg?resolution=160x160`}
                onError={() => setDefaultIcon(true)}
              />
            )}
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
            {isAdmin && (
              <>
                <Link
                  className="dropdown-item"
                  to="/admin-area"
                  onClick={close}
                >
                  {content.navbar.adminArea}
                </Link>
                <div className="dropdown-divider"></div>
              </>
            )}
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
        </div>
      ) : (
        <div className="nav-item text-nowrap">
          <Link className="nav-link" to="/login">
            {content.navbar.signin}
          </Link>
        </div>
      )}
    </>
  )
}
