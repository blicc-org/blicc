import { useEffect, useState } from 'react'
import { breakpoints } from '../../config'

export function useSizes(): Array<any> {
  const [xs, setXs] = useState(false)
  const [sm, setSm] = useState(false)
  const [md, setMd] = useState(false)
  const [lg, setLg] = useState(false)
  const [xl, setXl] = useState(false)

  useEffect(() => {
    function handleResize(): void {
      const width = window.innerWidth
      setXs(breakpoints.sx < width)
      setSm(breakpoints.sm < width)
      setMd(breakpoints.md < width)
      setLg(breakpoints.lg < width)
      setXl(breakpoints.xl < width)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return [xs, sm, md, lg, xl]
}
