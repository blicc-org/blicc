import { ACTION } from '..'

export const MASK = {
  NONE: 0,
  SINGLE: 1,
  ROW: 2,
  COLUMN: 3,
}

export function usePositioning() {
  function drawQuad(ctxRef, action) {
    //TODO: draw mask according to action and mask
  }

  function whichAction(event, mask) {
    // TODO: set action according to pos and mask
    return ACTION.NONE
  }

  return [whichAction, drawQuad]
}
