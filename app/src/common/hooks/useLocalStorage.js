import { useState } from 'react'

export function useLocalStorage(key, init) {
  if (!(localStorage.getItem(key) === null)) {
    init = JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(init))
  }

  const [state, setState] = useState(init)

  async function setLocalStorage(value) {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }

  return [state, setLocalStorage]
}
