import { useEffect, useState, useContext, useCallback } from 'react'
import uuid from 'uuid'
import { SubscriberContext, AppContext } from '../context'
import { DELIVERY } from '../../config'
import { QueryStackContext } from '../context/QueryStackContext'

export let socket = null
export let cache = []

export const WebSocketState = {
  [WebSocket.CONNECTING]: 'connecting',
  [WebSocket.OPEN]: 'open',
  [WebSocket.CLOSING]: 'closing',
  [WebSocket.CLOSED]: 'closed',
}

export function useDeliveryEndpoint() {
  const [queryStack, setQueryStack] = useContext(QueryStackContext)
  const [subscriberStack, setSubscriberStack] = useContext(SubscriberContext)
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const initialState = socket !== null ? socket.readyState : WebSocket.CLOSED
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (loggedIn && socket === null) {
      setState(WebSocket.CONNECTING)
      socket = new WebSocket(`${DELIVERY.ORIGIN}/connection`)

      socket.onopen = () => {
        console.log("open")
        console.log(queryStack)
        Object.keys(queryStack).forEach(channel => {
          console.log("something gets published")
          const payload = JSON.stringify({ channel, data: queryStack[channel] })
          console.log(payload)
          socket.send(payload)
        })
        setState(WebSocket.OPEN)
        setQueryStack([])
      }

      socket.onclose = () => {
        console.log("close")
        socket = null
        setState(WebSocket.CLOSED)
      }

      socket.onerror = e => {
        console.log(`An websocket error occured: ${JSON.stringify(e)}`)
      }
    }

    if (loggedIn && socket !== null) {
      socket.onmessage = evt => {
        console.log("on message")
        const { channel, data } = JSON.parse(evt.data)
        cache[channel] = data
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
  }, [loggedIn, subscriberStack, state, queryStack, setQueryStack])

  function publish(channel, data) {
    if (socket.readyState === WebSocket.OPEN) {
      console.log("something gets published: ", JSON.stringify({ channel, data }))
      socket.send(JSON.stringify({ channel, data }))
    } else {
      setQueryStack(prev => {
        prev[channel] = data
        return prev
      })
    }
  }

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
      return cache[channel] ? cache[channel] : null
    },
    [setSubscriberStack]
  )

  return [publish, subscribe, state]
}
