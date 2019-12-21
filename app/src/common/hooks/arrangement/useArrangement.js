import { useState } from 'react'
import uuid from 'uuid'

export const ACTION = {
  TOP: 0,
  BOTTOM: 1,
  LEFT: 2,
  RIGHT: 3,
  BEFORE: 4,
  AFTER: 5,
  REPLACE: 6,
}

export function useArrangement() {
  const [arrangement, setArrangement] = useState({})

  function insertInside(newId, targetId, action) {
    switch (action) {
      case ACTION.TOP:
        return {
          direction: 'column',
          items: [{ id: newId }, { id: targetId }],
        }
      case ACTION.BOTTOM:
        return {
          direction: 'column',
          items: [{ id: targetId }, { id: newId }],
        }
      case ACTION.LEFT:
        return {
          direction: 'row',
          items: [{ id: newId }, { id: targetId }],
        }
      case ACTION.RIGHT:
        return {
          direction: 'row',
          items: [{ id: targetId }, { id: newId }],
        }
      default:
    }
  }

  function insertAround(items, newId, targetId, action) {
    const index = items.findIndex(item => item.id === targetId)
    switch (action) {
      case ACTION.BEFORE:
        items.splice(index, 0, { id: newId })
        break
      case ACTION.AFTER:
        items.splice(index + 1, 0, { id: newId })
        break
      default:
    }
    return items
  }

  function insertRecursive(prev, newId, targetId, action) {
    if (prev.id) {
      if (prev.id === targetId) {
        if (action === ACTION.REPLACE) {
          return { id: newId }
        } else {
          return insertInside(newId, targetId, action)
        }
      } else {
        return prev
      }
    } else if (prev.items) {
      if (
        (action === ACTION.BEFORE || action === ACTION.AFTER) &&
        prev.items.some(item => item.id && item.id === targetId)
      ) {
        return {
          ...prev,
          items: insertAround(prev.items, newId, targetId, action),
        }
      } else {
        return {
          ...prev,
          items: prev.items.map(item =>
            insertRecursive(item, newId, targetId, action)
          ),
        }
      }
    } else {
      return {
        id: newId,
      }
    }
  }

  function insert(targetId, action) {
    const newId = uuid()
    setArrangement(prev => insertRecursive(prev, newId, targetId, action))
    return newId
  }

  function removeRecursive(prev, targetId) {
    if (prev.items) {
      if (prev.items.some(item => item.id && item.id === targetId)) {
        return {
          ...prev,
          items: prev.items.filter(item => !(item.id && item.id === targetId)),
        }
      } else {
        return {
          ...prev,
          items: prev.items.map(item => {
            if (item.items) {
              return removeRecursive(item, targetId)
            } else {
              return item
            }
          }),
        }
      }
    } else {
      return {}
    }
  }

  function clearRecursive(prev) {
    if (prev.items) {
      if (prev.items.some(item => item.items)) {
        if (prev.items.length === 1) {
          return {
            ...prev,
            items: prev.items[0].items,
          }
        } else {
          return {
            ...prev,
            items: prev.items.map(item => clearRecursive(item)),
          }
        }
      } else {
        if (prev.items.length === 1) {
          return {
            id: prev.items[0].id,
          }
        } else {
          return prev
        }
      }
    } else {
      return prev
    }
  }

  function remove(id) {
    setArrangement(prev => clearRecursive(removeRecursive(prev, id)))
  }

  return [arrangement, insert, remove]
}
