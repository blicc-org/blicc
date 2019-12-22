import React, { useState } from 'react'

export const ArrangementContext = React.createContext()

export function ArrangementProvider({ children }) {
  const [arrangement, setArrangement] = useState({})
  return (
    <ArrangementContext.Provider value={[arrangement, setArrangement]}>
      {children}
    </ArrangementContext.Provider>
  )
}
