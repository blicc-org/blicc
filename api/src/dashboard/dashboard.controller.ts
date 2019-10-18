import Koa from 'koa'

export class DashboardController {
  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.body = 'Has to be logged in!!!'
  }

  public async create(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
  }
}
