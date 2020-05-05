import Koa from 'koa'
import { getConnectionManager } from 'typeorm'
import statusCode from 'http-status-codes'
import { RabbitMQClient } from '../../util/rabbitmq-client'
import { RedisClient } from '../../util/redis-client'
import { IpAddress } from '../../util/ip-address'

export class HealthCheckController {
  public async healthCheck(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    const rabbitmq = await RabbitMQClient.status()
    const redis = RedisClient.status()
    const postgresql = getConnectionManager().connections.length > 0
    const ipAddress = IpAddress.access()

    ctx.status =
      rabbitmq && redis && postgresql
        ? statusCode.OK
        : statusCode.SERVICE_UNAVAILABLE
    ctx.body = {
      rabbitmq,
      redis,
      postgresql,
      ipAddress,
    }
  }

  public async healthCheckAuth(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()
    ctx.status = statusCode.NO_CONTENT
  }
}
