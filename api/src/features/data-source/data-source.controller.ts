import Koa from 'koa'
import status from 'http-status-codes'

export class DataSourceController {
  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.status = status.OK
  }
}
