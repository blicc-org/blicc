import React, { useState, useRef } from 'react'
import { useClickAway } from '../../hooks'
import { Plus, PieChart, Database } from 'react-feather'
import './Toolbox.scss'

export function Toolbox() {
  const [show, setShow] = useState(false)
  const ref = useRef()
  useClickAway(ref, () => setShow(false), 'prevent-toolnox-click-away')
  let rotation = show ? -135 : 0

  return (
    <>
      <div className="toolbox" ref={ref}>
        {show && (
          <>
            <div className="draggable" draggable={true}>
              <PieChart />
            </div>
            <div className="draggable" draggable={true}>
              <Database />
            </div>
          </>
        )}
        <button
          className={`btn btn-primary prevent-toolnox-click-away ${
            show ? 'show' : ''
          }`}
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => setShow(!show)}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <Plus />
        </button>
      </div>
    </>
  )
}
