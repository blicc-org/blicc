import { useEffect, useState, useRef, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { DELIVERY } from '../config/env'

export let sockets = null

export const websocketstate = {
  0: 'connecting',
  1: 'open',
  2: 'closing',
  3: 'closed',
}

export function useDeliveryEndpoint() {
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const url = `${DELIVERY.ORIGIN}/connection`
  const ref = useRef(null)
  const [state, setState] = useState(WebSocket.CLOSED)

  useEffect(() => {
    console.log(websocketstate[state])
    function start() {
      if (!sockets) {
        setState(WebSocket.CONNECTING)
        sockets = new WebSocket(url)
      }

      ref.current = sockets

      ref.current.onopen = () => {
        setState(WebSocket.OPEN)
        ref.current.send('hey')
      }

      ref.current.onclose = () => {
        setState(WebSocket.CLOSED)
      }

      ref.current.onmessage = ({ data }) => {
        console.log(`Socket received message: ${data}`)
      }

      ref.current.onerror = event => {
        console.log(`Socket error occured: ${event}`)
      }
    }

    if (loggedIn) start()
  }, [appState, state])

  function publish(data) {}
  function subscribe() {}

  return [publish, subscribe]
}
