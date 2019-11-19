import Koa from 'koa'
import status from 'http-status-codes'

export class HealthCheckController {
  public async healthCheck(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    ctx.status = status.OK
  }

  public async healthCheckAuth(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    ctx.status = status.OK
  }
}
