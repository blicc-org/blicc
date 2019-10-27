import { useState } from 'react'
import uuid from 'uuid'
import { POSITION } from '../components/dashboard/Positioning'
import { TYPE } from '../components/charts/Chart'
import { GRID } from '../components/dashboard/Row'

const INITIAL = {
  row: [
    {
      id: uuid(),
      col: GRID.FULL,
      type: TYPE.DRAG_HERE,
    },
  ],
}

export function useDashboard() {
  const [dashboard, setDashboard] = useState(INITIAL)

  function createRow(prev, pos, item) {
    switch (pos) {
      case POSITION.TOP:
        return [{ ...item, col: GRID.FULL }, { ...prev, col: GRID.FULL }]
      case POSITION.RIGHT:
        return [{ ...prev, col: GRID.HALF }, { ...item, col: GRID.HALF }]
      case POSITION.BOTTOM:
        return [{ ...prev, col: GRID.FULL }, { ...item, col: GRID.FULL }]
      case POSITION.LEFT:
        return [{ ...item, col: GRID.HALF }, { ...prev, col: GRID.HALF }]
      default:
    }
  }

  function add(prev, id, pos, item) {
    if (prev.id) {
      if (prev.id === id) {
        if (prev.type === TYPE.DRAG_HERE || pos === POSITION.REPLACE) {
          return {
            ...prev,
            ...item,
          }
        } else {
          return {
            col: prev.col,
            row: createRow(prev, pos, item),
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
  }

  return [dashboard, update]
}
