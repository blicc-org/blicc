import React, { createContext, useState, ReactElement } from 'react'

export const SubscriberContext = createContext<Array<any>>([])

export function SubscriberProvider({ children }: any): ReactElement {
  const [subscriberStack, setSubscriberStack] = useState({})
  return (
    <SubscriberContext.Provider value={[subscriberStack, setSubscriberStack]}>
      {children}
    </SubscriberContext.Provider>
  )
}
