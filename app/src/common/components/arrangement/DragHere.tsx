import React, { useContext, ReactElement } from 'react'
import { Positioning } from '../positioning/Positioning'
import { MASK } from '../../hooks'
import { DragContext, DRAG } from '../../context'
import { Empty } from '../ui'
import styles from './DragHere.module.scss'

export function DragHere({ edit, onDrop }: any): ReactElement {
  const [dragging] = useContext(DragContext)
  return (
    <>
      {edit ? (
        <div className={`${styles.dragHere} text-center pt-4`}>
          <p className="text-muted">Drag a chart in here!</p>
          {dragging !== DRAG.NONE && (
            <Positioning
              onDrop={(type: any, payload: any): void => onDrop(type, payload)}
              mask={dragging === DRAG.CHART ? MASK.NONE : MASK.DATA}
            />
          )}
        </div>
      ) : (
        <Empty>
          This dashboard does not contain any charts yet. Click on edit to start
          dragging new charts in the dashboard.
        </Empty>
      )}
    </>
  )
}
