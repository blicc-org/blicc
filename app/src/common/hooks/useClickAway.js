import { useEffect } from 'react'

export function useClickAway(ref, callback, classNamesToIgnore = '') {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (classNamesToIgnore) {
          if (!hasParentWithClass(event.target, classNamesToIgnore)) callback()
        } else callback()
      }
    }

    function hasParentWithClass(node, className) {
      if (!node || node.nodeName === 'BODY') return false
      if (node.classList && node.classList.contains(className)) return true
      return hasParentWithClass(node.parentNode, className)
    }

    document.addEventListener('mousedown', handleClick, false)
    document.addEventListener('touchstart', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
      document.removeEventListener('touchstart', handleClick, false)
    }
  }, [ref, callback, classNamesToIgnore])
}
