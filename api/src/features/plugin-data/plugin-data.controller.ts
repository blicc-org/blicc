import Koa from 'koa'
import statusCode from 'http-status-codes'

export class PluginDataController {
  public async set(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { bundle, title } = ctx.params
    ctx.body = `${bundle}/${title}`
    ctx.status = statusCode.OK
  }

  public async get(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { bundle, title } = ctx.params
    ctx.body = `${bundle}/${title}`
    ctx.status = statusCode.OK
  }

  public async flush(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { bundle, title } = ctx.params
    ctx.body = `${bundle}/${title}`
    ctx.status = statusCode.OK
  }
}
