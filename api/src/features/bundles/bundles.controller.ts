import { DefaultContext, Next } from 'koa'
import statusCode from 'http-status-codes'
import { RedisClient } from '../../util'

export class BundleController {
  public async set(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { slug } = ctx.params
    RedisClient.set(slug, ctx.request.body)
    ctx.status = statusCode.OK
  }

  public async get(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    const { slug } = ctx.params
    ctx.set('Content-Type', 'application/javascript')
    ctx.status = statusCode.OK
    ctx.body = await RedisClient.get(slug)
  }
}
