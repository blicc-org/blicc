import { useState } from 'react'
import uuid from 'uuid'
import { POSITION } from '../components/dashboard-view/positioning/Positioning'
import { TYPE } from '../components/charts/Chart'
import { GRID } from '../components/dashboard-view/Row'

export const INITIAL_DASHBOARD = {
  title: 'Dashboard',
  data: {
    row: [
      {
        id: uuid(),
        col: GRID.FULL,
        type: TYPE.DRAG_HERE,
      },
    ],
  },
}

export function useDashboard(initial = INITIAL_DASHBOARD) {
  const [data, setData] = useState(initial)

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

  function setDashboard(id, pos, type) {
    setData(prev => {
      return {
        ...prev,
        data: add(prev.data, id, pos, {
          id: uuid(),
          type,
        }),
      }
    })
  }

  return [data, setData, setDashboard]
}
