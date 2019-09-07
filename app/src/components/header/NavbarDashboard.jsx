import React from 'react'
import { Link } from 'react-router-dom'

export function NavbarDashboard({ loggedIn, amount }) {
  return (
    <>
      {loggedIn && (
        <ul className="navbar-nav">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to="/dashboards">
              {`Dashboards `}
              <span className="badge badge-pill bg-primary align-text-bottom">
                {amount}
              </span>
            </Link>
          </li>
        </ul>
      )}
    </>
  )
}
