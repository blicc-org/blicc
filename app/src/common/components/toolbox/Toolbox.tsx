import React, { useState, useRef } from 'react'
import { Plus, PieChart, Database } from 'react-feather'
import { useClickAway, useMobile, useInstalled } from '../../hooks'
import { Selector } from './Selector'
import { DRAG } from '../../context'
import './Toolbox.scss'

export function Toolbox() {
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(ref, () => setShow(false), 'prevent-toolnox-click-away')
  const rotation = show ? -135 : 0

  const style =
    isMobile && isInstalled
      ? { right: '40px', bottom: '82px' }
      : { right: '40px', bottom: '40px' }

  return (
    <>
      <div className="toolbox" style={style} ref={ref}>
        {show && (
          <>
            <Selector
              title="Drag and drop a chart type into a dashboard."
              type={DRAG.CHART}
            >
              <PieChart />
            </Selector>
            <Selector
              title="Drag and drop a data source into a chart."
              type={DRAG.DATA}
            >
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
