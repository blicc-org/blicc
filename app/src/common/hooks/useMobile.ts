import { useEffect, useState } from 'react'
import { breakpoints } from '../../config'

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(breakpoints.md > window.innerWidth)

  useEffect(() => {
    function handleResize(): void {
      setIsMobile(breakpoints.md > window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
