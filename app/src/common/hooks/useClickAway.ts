import { useEffect, RefObject } from 'react'

type Callback = () => void

export function useClickAway(
  ref: RefObject<any>,
  callback: Callback,
  classNamesToIgnore = ''
): void {
  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent): void {
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
    return (): void => {
      document.removeEventListener('mousedown', handleClick, false)
      document.removeEventListener('touchstart', handleClick, false)
    }
  }, [ref, callback, classNamesToIgnore])
}
