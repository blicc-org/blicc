import React, { useMemo, useState, ReactElement } from 'react'
import {
  useArrangement,
  useModal,
  useSettings,
  useEndpointWebSocket,
  useMobile,
  useInstalled,
  ACTION,
} from '../../hooks'
import { DragHere } from './DragHere'
import { SelectChartModal } from './SelectChartModal'
import { SelectDataSourceModal } from './SelectDataSourceModal'
import { Box } from './Box'
import { DRAG } from '../../context'
import './Arrangement.scss'

interface Props {
  edit?: boolean
  fullscreen?: boolean
}

export function Arrangement({
  edit = false,
  fullscreen = false,
}: Props): ReactElement {
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  const [arr, insertArr] = useArrangement()
  const [accessSet, insertSet, removeSet] = useSettings()
  const [targetId, setTargetId] = useState('')
  const [update, setUpdate] = useState(0)
  const trigger = (): void => setUpdate((prev) => ++prev)
  const [action, setAction] = useState(0)
  const [publish] = useEndpointWebSocket()

  const arrangementStyle: any = isMobile
    ? {}
    : {
        overflow: 'auto',
        width: '100%',
        height: '100%',
      }

  const captureStyle: any = fullscreen
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        backgroundColor: 'white',
      }
    : {}

  const [showDataSourceModal, hideDataSourceModal] = useModal(() => {
    return (
      <SelectDataSourceModal
        cancel={hideDataSourceModal}
        submit={(dataSourceId: string): void => {
          insertSet(targetId, 'data_source', dataSourceId)
          publish(`/data-sources/${dataSourceId}`)
          hideChartModal()
        }}
      />
    )
  }, [update, targetId])

  const [showChartModal, hideChartModal] = useModal(
    () => (
      <SelectChartModal
        cancel={hideChartModal}
        submit={(slug: string): void => {
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

  function onDrop(type: any, payload: any): void {
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
      <>
        <div
          className="col px-0"
          onDragOver={(evt): void => evt.preventDefault()}
          style={captureStyle}
        >
          {arr.items || arr.id ? (
            <div className="arrangement-border" style={arrangementStyle}>
              <Box arr={arr} onDrop={onDrop} edit={edit} isMobile={isMobile} />
            </div>
          ) : (
            <DragHere edit={edit} onDrop={onDrop} />
          )}
        </div>
        <div style={isMobile && isInstalled ? { marginBottom: '60px' } : {}} />
      </>
    )
    // eslint-disable-next-line
  }, [edit, arr, isMobile])
}
