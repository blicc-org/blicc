import React, { useState, useContext, useEffect } from 'react'
import { X, Radio, AlertCircle } from 'react-feather'
import { ReactComponent as Tool } from '../../../assets/img/Tool.svg'
import { PluginLoader } from './../plugin-loader/PluginLoader'
import { Positioning } from '../positioning/Positioning'
import { useSettings } from '../../hooks/settings/useSettings'
import { DragContext, DRAG } from '../../context'
import { useArrangement, useModal, useAlive, MASK } from '../../hooks'
import { PluginSettingsModal } from './PluginSettingsModal'
import { success, danger } from '../../../Theme.scss'
import './Plugin.scss'

export const UNIT = {
  NUMBER: 'number',
  CATEGORY: 'category',
  TIME: 'time',
}

export function Plugin({ id, onDrop, mask, isMobile }) {
  const [accessSet, insertSet, removeSet] = useSettings()
  const type = accessSet(id, 'chart_type')
  const [, , removeArr] = useArrangement()
  const [dragging] = useContext(DragContext)
  const [init, setInit] = useState(true)
  const [unit, setUnit] = useState({ xAxis: UNIT.CATEGORY, yAxis: UNIT.NUMBER })
  const [isAlive, keepAlive] = useAlive()

  const style = isMobile
    ? {
        height: '300px',
      }
    : {
        overflow: 'auto',
        width: '100%',
        height: '100%',
      }

  useEffect(() => {
    if (init) {
      const pluginSettings = accessSet(id, 'plugin_settings')
      if (pluginSettings && pluginSettings.unit) {
        setInit(false)
        setUnit(pluginSettings.unit)
      }
    }
  }, [id, unit, init, accessSet])

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
    <div className="plugin" style={style}>
      <div className="row text-muted pl-2">
        <div className="col">
          <p>
            {isAlive ? (
              <span style={{ color: success }}>
                <Radio size={18} />
              </span>
            ) : (
              <span style={{ color: danger }}>
                <AlertCircle size={16} />
              </span>
            )}
            {` ${type.split('/')[1]}`}
          </p>
        </div>
        <div className="col text-right toolbar">
          <Tool style={{ cursor: 'pointer' }} onClick={() => showModal()} />
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
      <PluginLoader id={id} type={type} keepAlive={keepAlive} />
      {dragging !== DRAG.NONE && (
        <Positioning
          onDrop={(type, payload) => onDrop(type, { ...payload, id })}
          mask={dragging === DRAG.CHART ? mask : MASK.DATA}
        />
      )}
    </div>
  )
}
