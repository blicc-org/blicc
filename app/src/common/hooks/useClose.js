import { useEffect } from 'react'

export function useClose(ref, callback, classNamesToIgnore = '') {
  useEffect(() => {
    function handleClick(event) {
      let link = hasParentOfType(event.target, 'A')

      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.classList.contains(classNamesToIgnore)
      ) {
        callback()
      } else if (link) {
        link.click()
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick, false)
    document.addEventListener('touchstart', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
      document.removeEventListener('touchstart', handleClick, false)
    }

    function hasParentOfType(node, type) {
      if (type !== 'BODY' && node.nodeName === 'BODY') return undefined
      if (type === node.nodeName) {
        return node
      }
      return hasParentOfType(node.parentNode, type)
    }
  }, [ref, callback, classNamesToIgnore])
}
