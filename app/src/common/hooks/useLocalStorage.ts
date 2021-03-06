import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, init = {}): Array<any> {
  const updateInMs = 3000

  if (localStorage.getItem(key) !== null) {
    init = JSON.parse(localStorage.getItem(key) || '')
  } else {
    localStorage.setItem(key, JSON.stringify(init))
  }

  const [state, setState] = useState(init)

  async function setLocalStorage(value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }

  useEffect(() => {
    async function fetchLocalStorage(): Promise<void> {
      const val = localStorage.getItem(key) || ''
      if (JSON.stringify(state) !== val) {
        setState(JSON.parse(val))
      }
    }

    const refreshIntervalId = setInterval(fetchLocalStorage, updateInMs)
    return (): void => clearInterval(refreshIntervalId)
  }, [state, key])

  return [state, setLocalStorage]
}
