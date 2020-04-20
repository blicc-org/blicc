export function useRemove(): any {
  function removeRecursive(prev: any, targetId: string): any {
    if (prev.items) {
      if (prev.items.some((item: any) => item.id && item.id === targetId)) {
        return {
          ...prev,
          items: prev.items.filter(
            (item: any) => !(item.id && item.id === targetId)
          ),
        }
      } else {
        return {
          ...prev,
          items: prev.items.map((item: any) => {
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

  function clearRecursive(prev: any): any {
    if (prev.items) {
      if (prev.items.some((item: any) => item.items)) {
        if (prev.items.length === 1) {
          return {
            ...prev.items[0],
          }
        } else {
          return {
            ...prev,
            items: prev.items.map((item: any) => clearRecursive(item)),
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

  function remove(prev: any, id: string): any {
    return clearRecursive(removeRecursive(prev, id))
  }

  return remove
}
