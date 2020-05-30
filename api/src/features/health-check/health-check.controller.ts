import { DefaultContext, Next } from 'koa'
import statusCode from 'http-status-codes'
import { getConnectionManager } from 'typeorm'
import { RabbitMQClient, RedisClient, IpAddress } from '../../util'

export class HealthCheckController {
  public async healthCheck(ctx: DefaultContext, next: Next): Promise<void> {
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

  public async healthCheckAuth(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    ctx.status = statusCode.NO_CONTENT
  }
}
