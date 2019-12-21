import { useState } from 'react'
import { useInsert, useRemove } from './helper'
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
  const insertHelper = useInsert()
  const removeHelper = useRemove()

  function insert(targetId, action) {
    const newId = uuid()
    setArrangement(prev => insertHelper(prev, newId, targetId, action))
    return newId
  }

  function remove(id) {
    setArrangement(prev => removeHelper(prev, id))
  }

  return [arrangement, insert, remove]
}
