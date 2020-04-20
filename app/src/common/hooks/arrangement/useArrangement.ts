import { useContext } from 'react'
import { v4 as uuid } from 'uuid'
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

export function useArrangement(): Array<any> {
  const [arrangement, setArrangement] = useContext(ArrangementContext)
  const insertHelper = useInsert()
  const removeHelper = useRemove()

  function insert(targetId: string, action: any): string {
    const newId = uuid()
    setArrangement((prev: any) => insertHelper(prev, newId, targetId, action))
    return newId
  }

  function remove(id: string): void {
    setArrangement((prev: string) => removeHelper(prev, id))
  }

  return [arrangement, insert, remove]
}
