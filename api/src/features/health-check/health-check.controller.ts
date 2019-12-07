import Koa from 'koa'
import statusCode from 'http-status-codes'

export class HealthCheckController {
  public async healthCheck(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    ctx.status = statusCode.OK
  }

  public async healthCheckAuth(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    ctx.status = statusCode.OK
  }
}
