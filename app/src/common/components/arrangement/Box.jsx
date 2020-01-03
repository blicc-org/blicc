import React from 'react'
import uuid from 'uuid'
import { MASK } from '../../hooks'
import { DragHere } from './DragHere'
import { Plugin } from './Plugin'

export function Box({ edit, arr, onDrop, mask = MASK.SINGLE }) {
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
                  edit={edit}
                  arr={item}
                  onDrop={onDrop}
                  mask={arr.direction === 'row' ? MASK.ROW : MASK.COLUMN}
                />
              ))}
            </div>
          )
        } else {
          return <DragHere edit={edit} onDrop={onDrop} />
        }
      })()}
    </>
  )
}
