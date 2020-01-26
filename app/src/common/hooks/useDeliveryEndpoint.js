import { useEffect, useState, useRef, useContext, useCallback } from 'react'
import uuid from 'uuid'
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
        console.log('WebSocket connection opened')
        setState(WebSocket.OPEN)
      }

      sockets.onclose = () => {
        console.log('WebSocket connection closed')
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
      ref.current.onmessage = evt => {
        const { channel, data } = JSON.parse(evt.data)
        if (channel && data && subscriberStack) {
          for (var key of Object.keys(subscriberStack)) {
            if (key.includes(channel)) subscriberStack[key](data)
          }
        }
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
    (channel, data) => {
      console.log(channel, JSON.stringify(data))
      if (state === WebSocket.OPEN) {
        ref.current.send(JSON.stringify({ channel, data }))
      } else {
        console.log('Connection has to be open to publish!')
      }
    },
    [state]
  )

  const subscribe = useCallback(
    (channel, callback) => {
      if (typeof callback !== 'function') {
        return
      }
      const id = channel + uuid()
      setSubscriberStack(stack => ({
        ...stack,
        [id]: callback,
      }))
    },
    [setSubscriberStack]
  )

  return [publish, subscribe, state]
}
