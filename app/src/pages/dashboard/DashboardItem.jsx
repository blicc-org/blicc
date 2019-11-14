import React from 'react'
import { Link } from 'react-router-dom'

export function DashboardItem({ id, title, creationDate }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{creationDate}</h6>
        <p className="card-text">Some more information</p>
        <Link className="card-link" to={`/dashboards/${id}`}>
          View Dashboard
        </Link>
      </div>
    </div>
  )
}
