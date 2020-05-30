import { DefaultContext, Next } from 'koa'

export class HealthCheckController {
  public async check(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    ctx.status = 204
  }
}
