import { useContext } from 'react'
import uuid from 'uuid'
import { useInsert, useRemove } from './helper'
import { ArrangementContext } from '../../context/ArrangementContext'

export const ACTION = {
  NONE: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFT: 4,
  REPLACE: 5,
  BEFORE: 6,
  AFTER: 7,
}

export function useArrangement() {
  const [arrangement, setArrangement] = useContext(ArrangementContext)
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
