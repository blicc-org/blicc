import { ACTION } from '../useArrangement'

export function useInsert() {
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

  function insert(prev, newId, targetId, action) {
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
          items: prev.items.map(item => insert(item, newId, targetId, action)),
        }
      }
    } else {
      return {
        id: newId,
      }
    }
  }

  return insert
}
