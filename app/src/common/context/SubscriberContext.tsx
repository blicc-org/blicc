import React, { createContext, useState } from 'react'

export const SubscriberContext = createContext<Array<any>>([])

export function SubscriberProvider({ children }: any) {
  const [subscriberStack, setSubscriberStack] = useState({})
  return (
    <SubscriberContext.Provider value={[subscriberStack, setSubscriberStack]}>
      {children}
    </SubscriberContext.Provider>
  )
}
