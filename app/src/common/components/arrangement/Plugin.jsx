import React, { useContext } from 'react'
import { X } from 'react-feather'
import { PluginLoader } from './../plugin-loader/PluginLoader'
import { Positioning } from '../positioning/Positioning'
import { useSettings } from '../../hooks/settings/useSettings'
import { DragContext, DRAG } from '../../context'
import { useArrangement, MASK } from '../../hooks'
import './Plugin.scss'

export function Plugin({ id, onDrop, mask }) {
  const [accessSet, , removeSet] = useSettings()
  const type = accessSet(id, 'chart_type')
  const [, , removeArr] = useArrangement()
  const [dragging] = useContext(DragContext)

  return (
    <div className="spread plugin">
      <div className="row text-muted px-2">
        <div className="col col-8">
          <p>{type}</p>
        </div>
        <div className="col col-4 text-right">
          <X
            size={18}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              removeArr(id)
              removeSet(id)
            }}
          />
        </div>
      </div>
      <hr />
      <PluginLoader id={id} type={type} />
      {dragging !== DRAG.NONE && (
        <Positioning
          onDrop={(type, payload) => onDrop(type, { ...payload, id })}
          mask={dragging === DRAG.CHART ? mask : MASK.DATA}
        />
      )}
    </div>
  )
}
