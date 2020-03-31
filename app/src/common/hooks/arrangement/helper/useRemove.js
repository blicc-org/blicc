export function useRemove() {
  function removeRecursive(prev, targetId) {
    if (prev.items) {
      if (prev.items.some((item) => item.id && item.id === targetId)) {
        return {
          ...prev,
          items: prev.items.filter(
            (item) => !(item.id && item.id === targetId)
          ),
        }
      } else {
        return {
          ...prev,
          items: prev.items.map((item) => {
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
      if (prev.items.some((item) => item.items)) {
        if (prev.items.length === 1) {
          return {
            ...prev.items[0],
          }
        } else {
          return {
            ...prev,
            items: prev.items.map((item) => clearRecursive(item)),
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

  function remove(prev, id) {
    return clearRecursive(removeRecursive(prev, id))
  }

  return remove
}
