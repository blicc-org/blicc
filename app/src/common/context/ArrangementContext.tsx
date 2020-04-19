import React, { useState, createContext } from 'react'

export const ArrangementContext = createContext<Array<any>>([])

export function ArrangementProvider({ children }: any) {
  const [arrangement, setArrangement] = useState({})
  return (
    <ArrangementContext.Provider value={[arrangement, setArrangement]}>
      {children}
    </ArrangementContext.Provider>
  )
}
