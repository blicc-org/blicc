import Koa from 'koa'
import statusCode from 'http-status-codes'
import { IpAddress } from '../../util/ip-address'

export class HealthCheckController {
  public async healthCheck(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    ctx.status = statusCode.NO_CONTENT
  }

  public async healthCheckAuth(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    ctx.status = statusCode.NO_CONTENT
  }

  public async healthCheckConfig(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    const idAddress = IpAddress.access()
    ctx.status = statusCode.OK
    ctx.body = { idAddress }
  }
}
