import React, { useContext, useState } from 'react'
import { X } from 'react-feather'
import { Positioning } from '../dashboard-view/positioning/Positioning'
import { DragContext } from '../../context'
import { DragHere } from './DragHere'
import { PluginSelectorModal } from './PluginSelectorModal'
import { useModal } from '../../hooks'
import { PluginLoader } from './PluginLoader'
import { plugins } from '../../../plugins/index'
import './ChartContainer.scss'

export const TYPE = {
  DRAG_HERE: 'drag-here',
  LINE_CHART: 'line-chart',
  PIE_CHART: 'pie-chart',
  BAR_CHART: 'bar-chart',
}

export function ChartContainer({ type, id, onDrop }) {
  const [dragging] = useContext(DragContext)

  const [pluginName, setPluginName] = useState('')
  const [sector, setSector] = useState(0)
  const [showModal, hideModal] = useModal(() => (
    <PluginSelectorModal
      plugins={plugins}
      cancel={hideModal}
      submit={() => {
        setPluginName('@essentials/pie-chart')
        onDrop(sector, '@essentials/pie-chart')
        hideModal()
      }}
    />
  ))

  function onDropHandler(sector, type) {
    setSector(sector)
    showModal()
  }

  return (
    <div className={`chart ${type !== TYPE.DRAG_HERE ? 'frame' : ''}`} key={id}>
      {type === TYPE.DRAG_HERE ? (
        <DragHere />
      ) : (
        <>
          <div className="row text-muted px-2">
            <div className="col col-8">
              <p>{type}</p>
            </div>
            <div className="col col-4 text-right">
              <X size={18} />
            </div>
          </div>
          <hr />
          <div className="px-2">
            {type === TYPE.DRAG_HERE ? (
              <DragHere />
            ) : (
              <PluginLoader name={type} />
            )}
          </div>
        </>
      )}

      {dragging && <Positioning onDrop={onDropHandler} />}
    </div>
  )
}
