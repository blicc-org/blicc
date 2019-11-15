import React from 'react'
import './DashboardHeader.scss'

export function DashboardHeader({ title, onSave }) {
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
            <a className="nav-link active" href="#">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Details
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
