import React from 'react'
import { Edit } from 'react-feather'

export function DashboardHeader({ title }) {
  return (
    <div className="dashboard-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2 pr-3">{title}</h1>
      <div className="btn-toolbar mb-2 mb-md-0">
        <button type="button" className="btn btn-sm btn-outline-secondary">
          <Edit className="mr-1" size={16} />
          Edit
        </button>
      </div>
    </div>
  )
}
