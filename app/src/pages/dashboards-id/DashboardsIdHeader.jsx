import React from 'react'
import { Link } from 'react-router-dom'
import './DashboardsIdHeader.scss'

export function DashboardsIdHeader({ title, onSave }) {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2">
        <h4 className="my-0">{title}</h4>
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
            <Link className="nav-link active" to="/">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Details
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
