import { useEffect, useState, useRef, useContext, useCallback } from 'react'
import { SubscriberContext } from '../context/SubscriberContext'
import { AppContext } from '../context/AppContext'
import { DELIVERY } from '../config/env'

export let sockets = null

export const WebSocketState = {
  [WebSocket.CONNECTING]: 'connecting',
  [WebSocket.OPEN]: 'open',
  [WebSocket.CLOSING]: 'closing',
  [WebSocket.CLOSED]: 'closed',
}

export function useDeliveryEndpoint() {
  const [subscriberStack, setSubscriberStack] = useContext(SubscriberContext)
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const ref = useRef(null)
  const [state, setState] = useState(WebSocket.CLOSED)

  const handleOnMessage = useCallback(
    msg => {
      Object.keys(subscriberStack).map(key => subscriberStack[key](msg))
    },
    [subscriberStack]
  )

  useEffect(() => {
    if (loggedIn && ref.current === null) {
      setState(WebSocket.CONNECTING)
      sockets = new WebSocket(`${DELIVERY.ORIGIN}/connection`)

      sockets.onopen = () => {
        setState(WebSocket.OPEN)
      }

      sockets.onclose = () => {
        setState(WebSocket.CLOSED)
      }

      sockets.onmessage = event => {
        handleOnMessage(event.data)
      }

      ref.current = sockets

      return () => {
        sockets = {}
      }
    }

    if (!loggedIn && ref.current !== null) {
      ref.current.close()
      setState(WebSocket.CLOSING)

      return () => {
        ref.current = null
      }
    }
  }, [loggedIn, handleOnMessage])

  const publish = useCallback(
    data => {
      if (state === WebSocket.OPEN) {
        ref.current.send(data)
      } else {
        console.log('Connection has to be open to publish!')
      }
    },
    [state]
  )

  const subscribe = useCallback((id, callback) => {
    if (typeof callback !== 'function') {
      return
    }

    setSubscriberStack(stack => ({
      ...stack,
      [id]: callback,
    }))
  }, [setSubscriberStack])

  return [publish, subscribe, state]
}
