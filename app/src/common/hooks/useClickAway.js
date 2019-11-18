import { useEffect } from 'react'

export function useClickAway(ref, callback, classNamesToIgnore = '') {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (classNamesToIgnore) {
          if (!event.target.classList.contains(classNamesToIgnore)) callback()
        } else callback()
      }
    }

    document.addEventListener('mousedown', handleClick, false)
    document.addEventListener('touchstart', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
      document.removeEventListener('touchstart', handleClick, false)
    }
  }, [ref, callback, classNamesToIgnore])
}
