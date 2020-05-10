import Koa from 'koa'
import statusCode from 'http-status-codes'
import { MinIOClient } from '../../util'
import { Resolution } from '../../common/services'

export class ThumbnailController {
  private lg: Resolution = new Resolution(1280, 720)
  private sm: Resolution = new Resolution(640, 360)
  private options: Array<string> = [this.lg.getString(), this.sm.getString()]

  public async serveDashboardThumbnails(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    const { imgName } = ctx.params
    const { resolution = this.sm.getString() } = ctx.query

    if (this.options.includes(resolution)) {
      const imgPath = `${resolution}/${imgName}`

      ctx.set('Content-Type', 'image/jpeg')
      ctx.body = await MinIOClient.load('dashboard-thumbnails', imgPath)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.BAD_REQUEST
  }

  public async serveChartThumbnails(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    const { imgName } = ctx.params
    const { resolution = this.sm.getString() } = ctx.query

    if (this.options.includes(resolution)) {
      const imgPath = `${resolution}/${imgName}`

      ctx.set('Content-Type', 'image/jpeg')
      ctx.body = await MinIOClient.load('chart-thumbnails', imgPath)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.BAD_REQUEST
  }

  public async serveDataSourceThumbnails(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    const { imgName } = ctx.params
    const { resolution = this.sm.getString() } = ctx.query

    if (this.options.includes(resolution)) {
      const imgPath = `${resolution}/${imgName}`

      ctx.set('Content-Type', 'image/jpeg')
      ctx.body = await MinIOClient.load('data-source-thumbnails', imgPath)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.BAD_REQUEST
  }
}
