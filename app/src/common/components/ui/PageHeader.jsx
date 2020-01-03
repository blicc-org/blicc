import React from 'react'
import { UpdateButton } from './UpdateButton'

export function PageHeader({ edit, onClick, title }) {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
      <h2 className="my-0">{title}</h2>
      <div className="btn-toolbar">
        <UpdateButton edit={edit} onClick={onClick} />
      </div>
    </div>
  )
}
