import React, { createContext, useState } from 'react'

export const DragContext = createContext()
export const { Consumer: DragConsumer } = DragContext

export function DragProvider({ children }) {
  const [dragState, setDragState] = useState(false)

  return (
    <DragContext.Provider value={[dragState, setDragState]}>
      {children}
    </DragContext.Provider>
  )
}
