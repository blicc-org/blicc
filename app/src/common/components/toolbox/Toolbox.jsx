import React, { useState, useRef } from 'react'
import { Plus, PieChart, Database } from 'react-feather'
import { useClickAway } from '../../hooks'
import { Selector } from './Selector'
import { DRAG } from '../../context'
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
            <Selector type={DRAG.CHART}>
              <PieChart />
            </Selector>
            <Selector type={DRAG.DATA}>
              <Database />
            </Selector>
          </>
        )}
        <button
          className={`btn btn-primary prevent-toolnox-click-away ${
            show ? 'show' : ''
          }`}
          type="button"
          title="Toggle toolbox"
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
