import { useEffect, useState, useRef, useContext, useCallback } from 'react'
import { SubscriberContext, AppContext } from '../context'
import { DELIVERY } from '../../config'

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

      sockets.onerror = e => {
        console.log(`An websocket error occured: ${JSON.stringify(e)}`)
      }

      ref.current = sockets

      return () => {
        sockets = {}
      }
    }

    if (loggedIn && ref.current !== null) {
      ref.current.onmessage = event => {
        Object.keys(subscriberStack).map(key =>
          subscriberStack[key](event.data)
        )
      }
    }

    if (!loggedIn && ref.current !== null) {
      ref.current.close()
      setState(WebSocket.CLOSING)

      return () => {
        ref.current = null
      }
    }
  }, [loggedIn, subscriberStack])

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

  const subscribe = useCallback(
    (id, callback) => {
      if (typeof callback !== 'function') {
        return
      }

      setSubscriberStack(stack => ({
        ...stack,
        [id]: callback,
      }))
    },
    [setSubscriberStack]
  )

  return [publish, subscribe, state]
}
