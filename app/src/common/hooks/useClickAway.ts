import { useEffect } from 'react'

export function useClickAway(
  ref: any,
  callback: any,
  classNamesToIgnore: string = ''
) {
  useEffect(() => {
    function handleClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (classNamesToIgnore) {
          if (!hasParentWithClass(event.target, classNamesToIgnore)) callback()
        } else callback()
      }
    }

    function hasParentWithClass(node: any, className: string): any {
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
