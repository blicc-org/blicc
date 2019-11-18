import React from 'react'
import { Link } from 'react-router-dom'
import './DashboardHeader.scss'

export function DashboardHeader({ title, onSave, view, setView }) {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h2 className="my-0">{title}</h2>
        <div className="btn-toolbar">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
      <div className="dashboard-tabs my-2">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link ${view === 'dashboard' ? 'active' : ''}`}
              to="/"
              onClick={event => {
                event.preventDefault()
                setView('dashboard')
              }}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${view === 'details' ? 'active' : ''}`}
              to="/"
              onClick={event => {
                event.preventDefault()
                setView('details')
              }}
            >
              Details
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
