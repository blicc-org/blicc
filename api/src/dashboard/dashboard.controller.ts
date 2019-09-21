import Koa from 'koa'

export class DashboardController {
  public async list(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()
  }

  public async create(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()
  }
}
