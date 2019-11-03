import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Grid } from '../../assets/img/Grid.svg'

export function NavbarMenu() {
  return (
    <li className="nav-item text-nowrap">
      <Link className="nav-link" to="/menu">
        <Grid className="grid" />
      </Link>
    </li>
  )
}
