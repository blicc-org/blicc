import React, { useMemo } from 'react'
import uuid from 'uuid'
import { useArrangement } from '../../hooks'
import { DragHere } from './Draghere'
import { Plugin } from './Plugin'
import './Arrangement.scss'

export function Arrangement() {
  const [arr] = useArrangement()
  return (
    <div className="spread" onDragOver={evt => evt.preventDefault()}>
      <Box arr={arr} />
    </div>
  )
}

export function Box({ arr }) {
  return useMemo(() => {
    return (
      <>
        {(() => {
          if (arr.id) {
            return <Plugin id={arr.id} />
          } else if (arr.items) {
            return (
              <div
                className="spread"
                style={{ display: 'flex', flexDirection: arr.direction }}
              >
                {arr.items.map(item => (
                  <Box key={uuid()} arr={item} />
                ))}
              </div>
            )
          } else {
            return <DragHere />
          }
        })()}
      </>
    )
  }, [arr])
}
