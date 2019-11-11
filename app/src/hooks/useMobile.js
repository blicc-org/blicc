import { useEffect, useState } from 'react'
import { breakpoints } from '../config'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(breakpoints.md > window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setIsMobile(breakpoints.md > window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
