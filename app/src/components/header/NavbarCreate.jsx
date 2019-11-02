import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'react-feather'

export function NavbarCreate() {
  return (
    <li className="nav-item text-nowrap">
      <Link className="nav-link" to="/create">
        <Plus className="create" size={24} />
      </Link>
    </li>
  )
}
