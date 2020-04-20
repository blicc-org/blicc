import { useState, useEffect } from 'react'

export function useSessionStorage(key: string, init = {}): Array<any> {
  const updateInMs = 3000

  if (sessionStorage.getItem(key) !== null) {
    init = JSON.parse(sessionStorage.getItem(key) || '')
  } else {
    sessionStorage.setItem(key, JSON.stringify(init))
  }

  const [state, setState] = useState(init)

  async function setSessionStorage(value: any): Promise<void> {
    sessionStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }

  useEffect(() => {
    async function fetchSessionStorage(): Promise<void> {
      const val = sessionStorage.getItem(key) || ''
      if (JSON.stringify(state) !== val) {
        setState(JSON.parse(val))
      }
    }

    const refreshIntervalId = setInterval(fetchSessionStorage, updateInMs)
    return (): void => clearInterval(refreshIntervalId)
  }, [state, key])

  return [state, setSessionStorage]
}
