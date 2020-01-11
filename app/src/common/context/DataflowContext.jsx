import React, { createContext, useState } from 'react'

export const DataflowContext = createContext()

export function DataflowProvider({ children }) {
  const [dataflow, setDataflow] = useState({})
  return (
    <DataflowContext.Provider value={[dataflow, setDataflow]}>
      {children}
    </DataflowContext.Provider>
  )
}
