import React from 'react'
import uuid from 'uuid'
import { MASK } from '../../hooks'
import { Plugin } from './Plugin'

export function Box({ edit, arr, onDrop, isMobile, mask = MASK.SINGLE }) {
  const style = isMobile
    ? {}
    : {
        display: 'flex',
        flexDirection: arr.direction,
        overflow: 'auto',
        width: '100%',
        height: '100%',
      }

  return (
    <>
      {arr.items ? (
        <div style={style}>
          {arr.items.map((item) => (
            <Box
              key={uuid()}
              edit={edit}
              arr={item}
              onDrop={onDrop}
              isMobile={isMobile}
              mask={arr.direction === 'row' ? MASK.ROW : MASK.COLUMN}
            />
          ))}
        </div>
      ) : (
        <Plugin id={arr.id} onDrop={onDrop} mask={mask} isMobile={isMobile} />
      )}
    </>
  )
}
