import React, { createContext, useState } from 'react'

export const QueryStackContext = createContext<Array<any>>([])
export const { Consumer: QueryStackConsumer } = QueryStackContext

export function QueryStackProvider({ children }: any) {
  const [queryStack, setQueryStack] = useState([])

  return (
    <QueryStackContext.Provider value={[queryStack, setQueryStack]}>
      {children}
    </QueryStackContext.Provider>
  )
}
