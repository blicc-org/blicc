import { useEffect, useState } from 'react'

export default function useDimensions() {
  const [dimensions, setDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}
