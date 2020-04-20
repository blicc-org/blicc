import React, { createContext, useState, ReactElement } from 'react'

export const DragContext = createContext<Array<any>>([])
export const { Consumer: DragConsumer } = DragContext

export const DRAG = {
  NONE: 0,
  CHART: 1,
  DATA: 2,
}

export function DragProvider({ children }: any): ReactElement {
  const [dragState, setDragState] = useState(DRAG.NONE)

  return (
    <DragContext.Provider value={[dragState, setDragState]}>
      {children}
    </DragContext.Provider>
  )
}
