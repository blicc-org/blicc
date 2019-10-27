import { useState } from 'react'
import uuid from 'uuid'
import { POSITION } from '../components/dashboard/Positioning'

export const INITIAL = 'drag-here'

export function useDashboard() {
  const [dashboard, setDashboard] = useState({
    row: [
      {
        id: '1',
        col: '12',
        type: INITIAL,
      },
    ],
  })

  function add(prev, id, pos, item) {
    if (prev.id) {
      if (prev.id === id) {
        if (prev.type === INITIAL) pos = POSITION.REPLACE
        switch (pos) {
          case POSITION.TOP:
            return {
              col: prev.col,
              row: [{ ...item, col: '12' }, { ...prev, col: '12' }],
            }
          case POSITION.RIGHT:
            return {
              col: prev.col,
              row: [{ ...prev, col: '6' }, { ...item, col: '6' }],
            }
          case POSITION.BOTTOM:
            return {
              col: prev.col,
              row: [{ ...prev, col: '12' }, { ...item, col: '12' }],
            }
          case POSITION.LEFT:
            return {
              col: prev.col,
              row: [{ ...item, col: '6' }, { ...prev, col: '6' }],
            }
          default:
            return {
              ...prev,
              ...item,
            }
        }
      } else return prev
    } else {
      return {
        ...prev,
        row: prev.row.map(obj => add(obj, id, pos, item)),
      }
    }
  }

  function update(id, pos, type) {
    setDashboard(prev =>
      add(prev, id, pos, {
        id: uuid(),
        type,
      })
    )
    console.log(`id: ${id}, pos: ${pos}, type: ${type}`)
  }

  return [dashboard, update]
}
