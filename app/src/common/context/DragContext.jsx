import React, { createContext, useState } from 'react'

export const DragContext = createContext()
export const { Consumer: DragConsumer } = DragContext

export const DRAG = {
  NONE: 0,
  CHART: 1,
  DATA: 2,
}

export function DragProvider({ children }) {
  const [dragState, setDragState] = useState(DRAG.NONE)

  return (
    <DragContext.Provider value={[dragState, setDragState]}>
      {children}
    </DragContext.Provider>
  )
}
