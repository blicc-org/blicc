import { DefaultContext, Next } from 'koa'
import fs from 'fs'
import sharp from 'sharp'
import statusCode from 'http-status-codes'
import { Logger, MinIOClient } from '../../util'
import { Resolution, ImageService } from '../../common/services'

export class ProfilePictureController {
  private BUCKET = 'profile-pictures'
  private REGION = 'de-east-1'
  private lg = new Resolution(640, 640)
  private sm = new Resolution(160, 160)

  public async serve(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { imgName } = ctx.params
    const { resolution = this.lg.getString() } = ctx.query

    if (`${ctx.state.jwt.userId}.jpg` === imgName) {
      if ([this.lg.getString(), this.sm.getString()].includes(resolution)) {
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

  public async set(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const quality = 50
    const { userId } = ctx.params

    if (ctx.state.jwt.userId === userId) {
      const { path } = ctx.state.files.image
      const imgName = `${userId}.jpg`

      let buf: Buffer = await sharp(path)
        .resize(this.lg.getWidth(), this.lg.getHeight())
        .jpeg({ quality })
        .toBuffer()
      ImageService.store(this.BUCKET, this.REGION, this.lg, imgName, buf)

      buf = await sharp(path)
        .resize(this.sm.getWidth(), this.sm.getHeight())
        .jpeg({ quality })
        .toBuffer()
      ImageService.store(this.BUCKET, this.REGION, this.sm, imgName, buf)

      fs.unlink(path, (err) => {
        if (err) throw err
        Logger.info(`File deleted ${path}`)
      })

      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async remove(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { userId } = ctx.params

    if (ctx.state.jwt.userId === userId) {
      await MinIOClient.remove(
        this.BUCKET,
        `${this.lg.getString()}/${userId}.jpg`
      )
      await MinIOClient.remove(
        this.BUCKET,
        `${this.sm.getString()}/${userId}.jpg`
      )
      ctx.status = statusCode.OK
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }
}
