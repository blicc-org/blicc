import Koa from 'koa'
import statusCode from 'http-status-codes'
import { RedisClient } from '../../util/redis-client'

export class BundleController {
  public async set(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { slug } = ctx.params
    RedisClient.getInstance().set(slug, ctx.request.body)
    ctx.status = statusCode.OK
  }

  public async get(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { slug } = ctx.params
    ctx.set('Content-Type', 'application/javascript')
    ctx.status = statusCode.OK
    ctx.body = await RedisClient.getInstance().get(slug)
  }
}
