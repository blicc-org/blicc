import React, { useMemo, useState } from 'react'
import uuid from 'uuid'
import { useArrangement, useModal, useSettings } from '../../hooks'
import { DragHere } from './Draghere'
import { Plugin } from './Plugin'
import { PluginSelectorModal } from './PluginSelectorModal'
import './Arrangement.scss'

export function Arrangement() {
  const [arr, insertArr] = useArrangement()
  const [, insertSet] = useSettings()
  const [targetId, setTargetId] = useState('')
  const [action, setAction] = useState(0)

  const [showModal, hideModal] = useModal(
    () => (
      <PluginSelectorModal
        cancel={hideModal}
        submit={slug => {
          const id = insertArr(targetId, action)
          insertSet(id, 'type', slug)
          hideModal()
        }}
      />
    ),
    [targetId, action]
  )

  function onDrop(action, id = '') {
    setTargetId(id)
    setAction(action)
    showModal()
  }

  return useMemo(() => {
    return (
      <div className="spread" onDragOver={evt => evt.preventDefault()}>
        <Box arr={arr} onDrop={onDrop} />
      </div>
    )
    // eslint-disable-next-line
  }, [arr])
}

export function Box({ arr, onDrop }) {
  return (
    <>
      {(() => {
        if (arr.id) {
          return <Plugin id={arr.id} onDrop={onDrop} />
        } else if (arr.items) {
          return (
            <div
              className="spread"
              style={{ display: 'flex', flexDirection: arr.direction }}
            >
              {arr.items.map(item => (
                <Box key={uuid()} arr={item} onDrop={onDrop} />
              ))}
            </div>
          )
        } else {
          return <DragHere onDrop={onDrop} />
        }
      })()}
    </>
  )
}
