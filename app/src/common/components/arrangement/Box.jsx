import React from 'react'
import uuid from 'uuid'
import { MASK } from '../positioning/Positioning'
import { DragHere } from './Draghere'
import { Plugin } from './Plugin'

export function Box({ arr, onDrop, mask = MASK.SINGLE }) {
  return (
    <>
      {(() => {
        if (arr.id) {
          return <Plugin id={arr.id} onDrop={onDrop} mask={mask} />
        } else if (arr.items) {
          return (
            <div
              className="spread"
              style={{ display: 'flex', flexDirection: arr.direction }}
            >
              {arr.items.map(item => (
                <Box
                  key={uuid()}
                  arr={item}
                  onDrop={onDrop}
                  mask={arr.direction === 'row' ? MASK.ROW : MASK.COLUMN}
                />
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
