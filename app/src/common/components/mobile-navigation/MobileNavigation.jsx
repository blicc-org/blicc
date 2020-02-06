import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, PieChart, Database } from 'react-feather'
import './MobileNavigation.scss'

export function MobileNavigation() {
  return (
    <div className="mobile-navigation">
      <ul className="nav flex-row justify-content-around py-1">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboards">
            <Layout className="feather" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/charts">
            <PieChart className="feather" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/data-sources">
            <Database className="feather" />
          </Link>
        </li>
      </ul>
    </div>
  )
}
