import React from 'react'
import { Link } from 'react-router-dom'
import './Tabs.scss'

export function Tabs({ tabs = [], currentTab, setCurrentTab }) {
  return (
    <div className="tabs my-2">
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <Link
              className={`nav-link ${tab === currentTab ? 'active' : ''}`}
              to="/"
              onClick={(event) => {
                event.preventDefault()
                setCurrentTab(tab)
              }}
            >
              {tab}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
