import React, { useContext, useState } from 'react'
import { X } from 'react-feather'
import { PluginLoader } from './PluginLoader'
import { Positioning } from '../positioning/Positioning'
import { useSettings } from '../../hooks/settings/useSettings'
import { DragContext } from '../../context'
import { useArrangement, useModal } from '../../hooks'
import { PluginSelectorModal } from './PluginSelectorModal'
import './Plugin.scss'

export function Plugin({ id }) {
  const [set, get] = useSettings(id)
  const type = get('type')
  const [, insert, remove] = useArrangement()
  const [dragging] = useContext(DragContext)
  const [action, setAction] = useState(0)
  const [showModal, hideModal] = useModal(() => (
    <PluginSelectorModal
      cancel={hideModal}
      submit={slug => {
        insert(id, action)
        set('type', slug)
        hideModal()
      }}
    />
  ))

  function onDrop(action) {
    setAction(action)
    showModal()
  }

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
            onClick={() => remove(id)}
          />
        </div>
      </div>
      <hr />
      <div className="px-2">
        <PluginLoader id={id} slug={type} />
      </div>
      {dragging && <Positioning onDrop={onDrop} />}
    </div>
  )
}
