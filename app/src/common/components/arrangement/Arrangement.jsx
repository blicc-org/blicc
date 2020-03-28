import React, { useMemo, useState } from 'react'
import {
  useArrangement,
  useModal,
  useSettings,
  usePublisher,
  useMobile,
  useInstalled,
  ACTION,
} from '../../hooks'
import { SelectChartModal } from './SelectChartModal'
import { SelectDataSourceModal } from './SelectDataSourceModal'
import { Box } from './Box'
import { DRAG } from '../../context'
import './Arrangement.scss'

export function Arrangement({ edit }) {
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  const [arr, insertArr] = useArrangement()
  const [accessSet, insertSet, removeSet] = useSettings()
  const [targetId, setTargetId] = useState('')
  const [update, setUpdate] = useState(0)
  const trigger = () => setUpdate(prev => ++prev)
  const [action, setAction] = useState(0)
  const [, publishById] = usePublisher()

  const style = isMobile
    ? { height: '100%' }
    : {
        overflow: 'auto',
        width: '100%',
        height: '100%',
      }

  const [showDataSourceModal, hideDataSourceModal] = useModal(() => {
    return (
      <SelectDataSourceModal
        cancel={hideDataSourceModal}
        submit={dataSourceId => {
          insertSet(targetId, 'data_source', dataSourceId)
          publishById(dataSourceId)
          hideChartModal()
        }}
      />
    )
  }, [update, targetId])

  const [showChartModal, hideChartModal] = useModal(
    () => (
      <SelectChartModal
        cancel={hideChartModal}
        submit={slug => {
          const id = insertArr(targetId, action)
          if (action === ACTION.REPLACE) {
            const dataSourceId = accessSet(targetId, 'data_source')
            removeSet(targetId)
            insertSet(id, 'data_source', dataSourceId)
          }
          insertSet(id, 'chart_type', slug)
          hideChartModal()
        }}
      />
    ),
    [update, targetId, action]
  )

  function onDrop(type, payload) {
    if (type === DRAG.CHART) {
      const { action, id = '' } = payload
      setTargetId(id)
      setAction(action)
      showChartModal()
    } else if (type === DRAG.DATA) {
      const { id = '' } = payload
      setTargetId(id)
      showDataSourceModal()
    }
    trigger()
  }

  return useMemo(() => {
    return (
      <div
        className="col px-0 arrangement"
        style={style}
        onDragOver={evt => evt.preventDefault()}
      >
        <Box arr={arr} onDrop={onDrop} edit={edit} isMobile={isMobile} />
        <div style={isMobile && isInstalled ? { height: '60px' } : {}} />
      </div>
    )
    // eslint-disable-next-line
  }, [edit, arr, isMobile])
}
