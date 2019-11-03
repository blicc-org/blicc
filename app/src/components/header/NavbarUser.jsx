import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'react-feather'

export function NavbarUser({ firstName, lastName, loggedIn, logout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const ref = useRef()

  function toggle() {
    setDropdownOpen(prevState => !prevState)
  }

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', event => handleClick(event))
    return document.removeEventListener('mousedown', event =>
      handleClick(event)
    )
  }, [])

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
            onClick={(event) => {
              event.preventDefault()
              toggle()
            }}
          >
            <User className="user" size={24}></User>
          </a>
          <div
            
            className={`dropdown-menu dropdown-menu-right ${
              dropdownOpen ? 'show' : ''
            }`}
            aria-labelledby="navbarDropdown"
          >
            <h6 className="dropdown-header">{`Welcome ${firstName} ${lastName}`}</h6>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/profile" onClick={toggle}>
              Profile
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => {
                toggle()
                logout()
              }}
            >
              Logout
            </Link>
          </div>
        </li>
      ) : (
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="/login">
            Sign in
          </Link>
        </li>
      )}
    </>
  )
}
