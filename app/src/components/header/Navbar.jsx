import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../common/context/AppContext'
import './Navbar.css'

export default function NavBar() {
  const { metadata } = useContext(AppContext)

  return (
    <>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          {metadata.title}
        </Link>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to="/login">
              Sign in
            </Link>
          </li>
        </ul>
      </nav>
      <div className="moveUnderNavBar" />
    </>
  )
}
