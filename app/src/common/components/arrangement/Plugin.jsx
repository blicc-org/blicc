import React, { useState, useContext } from 'react'
import { Settings, X } from 'react-feather'
import { PluginLoader } from './../plugin-loader/PluginLoader'
import { Positioning } from '../positioning/Positioning'
import { useSettings } from '../../hooks/settings/useSettings'
import { DragContext, DRAG } from '../../context'
import { useArrangement, useModal, MASK } from '../../hooks'
import { PluginSettingsModal } from './PluginSettingsModal'
import './Plugin.scss'

export function Plugin({ id, onDrop, mask }) {
  const [accessSet, insertSet, removeSet] = useSettings()
  const type = accessSet(id, 'chart_type')
  const [, , removeArr] = useArrangement()
  const [dragging] = useContext(DragContext)
  const [unit, setUnit] = useState('')

  const [showModal, hideModal] = useModal(
    () => (
      <PluginSettingsModal
        cancel={hideModal}
        unit={unit}
        setUnit={setUnit}
        submit={() => {
          insertSet(id, 'plugin_settings', { unit })
          hideModal()
        }}
      />
    ),
    [unit]
  )

  return (
    <div className="spread plugin">
      <div className="row text-muted px-2">
        <div className="col col-8">
          <p>{type}</p>
        </div>
        <div className="col col-4 text-right">
          <Settings
            className="toolbar-settings"
            size={16}
            style={{ cursor: 'pointer' }}
            onClick={() => showModal()}
          />
          {'|'}
          <X
            className="toolbar-close"
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
