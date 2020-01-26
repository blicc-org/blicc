import { useEffect, useState, useContext, useCallback } from 'react'
import uuid from 'uuid'
import { SubscriberContext, AppContext } from '../context'
import { DELIVERY } from '../../config'

export let socket = null

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
  const [state, setState] = useState(
    socket && socket.readyState ? socket.readyState : WebSocket.CLOSED
  )

  useEffect(() => {
    if (loggedIn && socket === null) {
      setState(WebSocket.CONNECTING)
      socket = new WebSocket(`${DELIVERY.ORIGIN}/connection`)

      socket.onopen = () => {
        setState(WebSocket.OPEN)
      }

      socket.onclose = () => {
        socket = null
        setState(WebSocket.CLOSED)
      }

      socket.onerror = e => {
        console.log(`An websocket error occured: ${JSON.stringify(e)}`)
      }
    }

    if (loggedIn && socket !== null) {
      socket.onmessage = evt => {
        const { channel, data } = JSON.parse(evt.data)
        if (channel && data && subscriberStack) {
          for (var key of Object.keys(subscriberStack)) {
            if (key.includes(channel)) subscriberStack[key](data)
          }
        }
      }
    }

    if (!loggedIn && socket !== null) {
      socket.close()
      setState(WebSocket.CLOSING)

      return () => {
        socket = null
      }
    }
  }, [loggedIn, subscriberStack, state])

  const publish = useCallback(
    (channel, data) => {
      if (state === WebSocket.OPEN) {
        socket.send(JSON.stringify({ channel, data }))
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
