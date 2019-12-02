import Koa from 'koa'
import statusCode from 'http-status-codes'
import { RedisClient } from '../../util/redis-client'

export class PluginDataController {
  public async set(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { bundle, title } = ctx.params
    RedisClient.getInstance().set(`${bundle}/${title}`, ctx.request.body)
    ctx.status = statusCode.OK
  }

  public async get(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { bundle, title } = ctx.params
    ctx.set('Content-Type', 'application/javascript')
    ctx.status = statusCode.OK
    ctx.body = await RedisClient.getInstance().get(`${bundle}/${title}`)
  }
}
