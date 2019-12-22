import { useContext } from 'react'
import uuid from 'uuid'
import { useInsert, useRemove } from './helper'
import { ArrangementContext } from '../../context/ArrangementContext'

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
