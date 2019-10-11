import React, { createContext, useState } from 'react'

export const SubscriberContext = createContext()

export function SubscriberProvider({ children }) {
  const [subscriberStack, setSubscriberStack] = useState({})
  return (
    <SubscriberContext.Provider value={[subscriberStack, setSubscriberStack]}>
      {children}
    </SubscriberContext.Provider>
  )
}
