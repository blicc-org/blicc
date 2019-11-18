import { useEffect } from 'react'

export function useClickAway(ref, callback, classNamesToIgnore = '') {
  useEffect(() => {
    function handleClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        classNamesToIgnore &&
        !event.target.classList.contains(classNamesToIgnore)
      ) {
        callback()
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
