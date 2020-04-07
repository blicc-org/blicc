import Koa from 'koa'
import statusCode from 'http-status-codes'
import { MinioClient } from '../../util/minio-client'

export class ThumbnailController {
  public async serve(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()

    const { resolution = '640x360' } = ctx.query

    if (!['640x360', '1280x720'].includes(resolution)) {
      ctx.status = statusCode.BAD_REQUEST
      return
    }
    const { imgName } = ctx.params
    const imgPath = `${resolution}/${imgName}`
    ctx.set('Content-Type', 'image/jpeg')
    ctx.body = await MinioClient.load('dashboard-thumbnails', imgPath)
  }
}
