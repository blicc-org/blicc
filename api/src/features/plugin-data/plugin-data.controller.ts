import Koa from 'koa'
import statusCode from 'http-status-codes'

export class PluginDataController {
  public async set(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { slug } = ctx.params
    ctx.body = slug
    ctx.status = statusCode.OK
  }
}
