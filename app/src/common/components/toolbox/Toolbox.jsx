import React, { useState } from 'react'
import { Plus } from 'react-feather'
import './Toolbox.scss'

export function Toolbox() {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className="dropdown dropup toolbox">
        <button
          className="btn btn-primary"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => setShow(!show)}
        >
          <Plus />
        </button>
        <div
          className={`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`}
          aria-labelledby="dropdownMenuButton"
        >
          <h6 className="dropdown-header">Edit Dashboard</h6>
          <a className="dropdown-item" href="/">
            Chart
          </a>
          <a className="dropdown-item" href="/">
            Data Relation
          </a>
        </div>
      </div>
    </>
  )
}
