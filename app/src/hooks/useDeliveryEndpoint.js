import { useEffect, useState, useRef, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { DELIVERY } from '../config/env'

let sockets = null

const WebSocketStates = {
  [WebSocket.CONNECTING]: 'connecting',
  [WebSocket.OPEN]: 'open',
  [WebSocket.CLOSING]: 'closing',
  [WebSocket.CLOSED]: 'closed',
}

export function useDeliveryEndpoint() {
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const ref = useRef(null)
  const [state, setState] = useState(WebSocket.CLOSED)

  console.log(WebSocketStates[state])

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

      sockets.onmessage = ({ data }) => {
        console.log(`Socket received message: ${data}`)
      }

      sockets.onerror = event => {
        console.log(`Socket error occured: ${event}`)
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
  }, [loggedIn])

  function publish() {}

  function subscribe() {}

  return [publish, subscribe]
}
