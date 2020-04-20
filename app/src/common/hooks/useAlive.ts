import { useState, useEffect } from 'react'

export function useAlive(): Array<any> {
  const offsetInSec = 10
  const [count, setCount] = useState(offsetInSec)

  useEffect(() => {
    const worker = setInterval(() => {
      setCount((prev) => (prev > 0 ? --prev : 0))
    }, 1000)
    return (): void => clearInterval(worker)
  }, [])

  return [count > 0, (): void => setCount(offsetInSec)]
}
