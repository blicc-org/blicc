import React from 'react'

export function PageHeader({ edit, onClick, title }) {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
      <h2 className="my-0">{title}</h2>
      <div className="btn-toolbar">
        {edit ? (
          <button
            title="Save dashboard"
            type="button"
            className="btn btn-sm btn-primary"
            onClick={onClick}
          >
            Save
          </button>
        ) : (
          <button
            title="Edit dashboard"
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={onClick}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}
