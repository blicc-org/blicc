import React, { useState, createContext, ReactElement } from 'react'

export const ArrangementContext = createContext<Array<any>>([])

export function ArrangementProvider({ children }: any): ReactElement {
  const [arrangement, setArrangement] = useState({})
  return (
    <ArrangementContext.Provider value={[arrangement, setArrangement]}>
      {children}
    </ArrangementContext.Provider>
  )
}
