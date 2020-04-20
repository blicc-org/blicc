import React, { ReactElement } from 'react'
import './Card.scss'

export function Card({ title = '', children }: any): ReactElement {
  return (
    <div className="card mb-3">
      {title && <h5 className="card-header">{title}</h5>}
      <div className="card-body">{children}</div>
    </div>
  )
}
