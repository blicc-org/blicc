import React from 'react'

export function Card({ title = '', children }) {
  return (
    <div className="card mb-4">
      {title && <h5 className="card-header">{title}</h5>}
      <div className="card-body">{children}</div>
    </div>
  )
}
