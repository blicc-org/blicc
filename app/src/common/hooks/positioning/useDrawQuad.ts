import { MASK } from './useSelectAction'
import { ACTION } from '../arrangement/useArrangement'
import { useColor } from '..'
import theme from '../../../Theme.scss'

export function useDrawQuad(): Function {
  const [hexToRgb] = useColor()

  function draw(
    ctxRef: any,
    p1: any,
    p2: any,
    p3: any,
    p4: any,
    color: string = theme.success
  ): void {
    const clr = hexToRgb(color)
    ctxRef.current.fillStyle = `rgba(${clr.r}, ${clr.g}, ${clr.b}, 0.5)`
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(p1.x, p1.y)
    ctxRef.current.lineTo(p2.x, p2.y)
    ctxRef.current.lineTo(p3.x, p3.y)
    ctxRef.current.lineTo(p4.x, p4.y)
    ctxRef.current.closePath()
    ctxRef.current.fill()
  }

  function drawQuad(canvasRef: any, ctxRef: any, action: any, mask: any): void {
    if (action === ACTION.NONE) return
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const p1 = { x: 0, y: 0 }
    const p2 = { x: width, y: 0 }
    const p3 = { x: width, y: height }
    const p4 = { x: 0, y: height }
    const p5 = { x: width / 8, y: height / 8 }
    const p6 = { x: (width * 7) / 8, y: height / 8 }
    const p7 = { x: (width * 7) / 8, y: (height * 7) / 8 }
    const p8 = { x: width / 8, y: (height * 7) / 8 }
    const p9 = { x: width / 4, y: height / 4 }
    const p10 = { x: (width * 3) / 4, y: height / 4 }
    const p11 = { x: (width * 3) / 4, y: (height * 3) / 4 }
    const p12 = { x: width / 4, y: (height * 3) / 4 }

    switch (mask) {
      case MASK.NONE:
        draw(ctxRef, p1, p2, p3, p4)
        break
      case MASK.SINGLE:
        if (action === ACTION.TOP) draw(ctxRef, p1, p2, p10, p9)
        if (action === ACTION.RIGHT) draw(ctxRef, p2, p3, p11, p10)
        if (action === ACTION.BOTTOM) draw(ctxRef, p12, p11, p3, p4)
        if (action === ACTION.LEFT) draw(ctxRef, p1, p9, p12, p4)
        if (action === ACTION.REPLACE)
          draw(ctxRef, p9, p10, p11, p12, theme.danger)
        break
      case MASK.ROW:
        if (action === ACTION.TOP) draw(ctxRef, p1, p2, p10, p9)
        if (action === ACTION.RIGHT) draw(ctxRef, p10, p6, p7, p11)
        if (action === ACTION.BOTTOM) draw(ctxRef, p12, p11, p3, p4)
        if (action === ACTION.LEFT) draw(ctxRef, p5, p9, p12, p8)
        if (action === ACTION.REPLACE)
          draw(ctxRef, p9, p10, p11, p12, theme.danger)
        if (action === ACTION.BEFORE) draw(ctxRef, p1, p5, p8, p4, theme.info)
        if (action === ACTION.AFTER) draw(ctxRef, p2, p3, p7, p6, theme.info)
        break
      case MASK.COLUMN:
        if (action === ACTION.TOP) draw(ctxRef, p5, p6, p10, p9)
        if (action === ACTION.RIGHT) draw(ctxRef, p2, p3, p11, p10)
        if (action === ACTION.BOTTOM) draw(ctxRef, p12, p11, p7, p8)
        if (action === ACTION.LEFT) draw(ctxRef, p1, p9, p12, p4)
        if (action === ACTION.REPLACE)
          draw(ctxRef, p9, p10, p11, p12, theme.danger)
        if (action === ACTION.BEFORE) draw(ctxRef, p1, p2, p6, p5, theme.info)
        if (action === ACTION.AFTER) draw(ctxRef, p7, p3, p4, p8, theme.info)
        break
      case MASK.DATA:
        draw(ctxRef, p1, p2, p3, p4, theme.blue)
        break
      default:
    }
  }

  return drawQuad
}
