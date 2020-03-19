import Koa from 'koa'

export class HealthCheckController {
  public async check(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.status = 204
  }
}
