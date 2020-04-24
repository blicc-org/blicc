import Koa from 'koa'
import { getConnectionManager } from 'typeorm'
import statusCode from 'http-status-codes'
import { RabbitMQClient } from '../../util/rabbitmq-client'
import { RedisClient } from '../../util/redis-client'

export class HealthCheckController {
  public async healthCheck(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    const rabbitmq = RabbitMQClient.status()
    const redis = RedisClient.status()
    const postgresql = getConnectionManager().connections.length > 0

    ctx.status =
      rabbitmq && redis && postgresql
        ? statusCode.OK
        : statusCode.SERVICE_UNAVAILABLE
    ctx.body = {
      rabbitmq,
      redis,
      postgresql,
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
