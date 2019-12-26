import { ACTION } from '..'

export const MASK = {
  NONE: 0,
  SINGLE: 1,
  ROW: 2,
  COLUMN: 3,
}

export function useSelectAction() {
  function getNormalizedCoordinates(canvasRef, clientX, clientY) {
    const rect = canvasRef.current.getBoundingClientRect()
    return [
      (clientX - rect.left) / canvasRef.current.offsetWidth,
      (clientY - rect.top) / canvasRef.current.offsetHeight,
    ]
  }

  function isCenter(x, y) {
    return x > 0.25 && x < 0.75 && y > 0.25 && y < 0.75
  }

  function isRim(x, y) {
    return !(x > 0.125 && x < 0.875 && y > 0.125 && y < 0.875)
  }

  function getDirection(x, y) {
    if (x > y) {
      return x + y < 1 ? ACTION.TOP : ACTION.RIGHT
    } else {
      return x + y >= 1 ? ACTION.BOTTOM : ACTION.LEFT
    }
  }

  function whichAction(canvasRef, event, mask) {
    const [x, y] = getNormalizedCoordinates(
      canvasRef,
      event.clientX,
      event.clientY
    )

    if (mask === MASK.NONE || isCenter(x, y)) {
      return ACTION.REPLACE
    } else {
      const direction = getDirection(x, y)
      if (mask === MASK.SINGLE || !isRim(x, y)) {
        return direction
      } else if (mask === MASK.ROW) {
        if (direction === ACTION.LEFT) return ACTION.BEFORE
        if (direction === ACTION.RIGHT) return ACTION.AFTER
        return direction
      } else {
        if (direction === ACTION.TOP) return ACTION.BEFORE
        if (direction === ACTION.BOTTOM) return ACTION.AFTER
        return direction
      }
    }
  }

  return whichAction
}
