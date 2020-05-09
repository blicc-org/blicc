import Koa from 'koa'
import fs from 'fs'
import sharp from 'sharp'
import statusCode from 'http-status-codes'
import { Logger, MinIOClient } from '../../util'

export class ProfilePictureController {
  private BUCKET = 'profile-pictures'

  public async serve(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { imgName } = ctx.params
    const { resolution = '640x640' } = ctx.query

    if (`${ctx.state.jwt.userId}.jpg` === imgName) {
      if (['640x640', '160x160'].includes(resolution)) {
        const imgPath = `${resolution}/${imgName}`

        ctx.set('Content-Type', 'image/jpeg')
        ctx.body = await MinIOClient.load(this.BUCKET, imgPath)
        ctx.status = statusCode.OK
        return
      }
      ctx.status = statusCode.BAD_REQUEST
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async set(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const region = 'de-east-1'
    const quality = 50
    const { userId } = ctx.params

    if (ctx.state.jwt.userId === userId) {
      const { path } = ctx.state.files.image
      const imgName = `${userId}.jpg`

      let buf: Buffer = await sharp(path)
        .resize(640, 640)
        .jpeg({ quality })
        .toBuffer()
      MinIOClient.store(this.BUCKET, region, `640x640/${imgName}`, buf)

      buf = await sharp(path).resize(160, 160).jpeg({ quality }).toBuffer()
      MinIOClient.store(this.BUCKET, region, `160x160/${imgName}`, buf)

      fs.unlink(path, (err) => {
        if (err) throw err
        Logger.info(`File deleted ${path}`)
      })

      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async remove(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { userId } = ctx.params

    if (ctx.state.jwt.userId === userId) {
      await MinIOClient.remove(this.BUCKET, `640x640/${userId}.jpg`)
      await MinIOClient.remove(this.BUCKET, `160x160/${userId}.jpg`)
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }
}
