import { ACTION } from '../useArrangement'

export function useInsert(): any {
  function insertInside(newId: string, targetId: string, action: any): any {
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

  function insertAround(
    items: any,
    newId: string,
    targetId: string,
    action: any
  ): any {
    const index = items.findIndex((item: any) => item.id === targetId)
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

  function insert(
    prev: any,
    newId: string,
    targetId: string,
    action: any
  ): any {
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
        prev.items.some((item: any) => item.id && item.id === targetId)
      ) {
        return {
          ...prev,
          items: insertAround(prev.items, newId, targetId, action),
        }
      } else {
        return {
          ...prev,
          items: prev.items.map((item: any) =>
            insert(item, newId, targetId, action)
          ),
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
