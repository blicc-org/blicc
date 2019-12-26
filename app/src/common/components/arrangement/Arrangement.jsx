import React, { useMemo, useState } from 'react'
import { useArrangement, useModal, useSettings } from '../../hooks'
import { PluginSelectorModal } from './PluginSelectorModal'
import { Box } from './Box'
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
