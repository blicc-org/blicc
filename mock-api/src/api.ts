import Koa from 'koa'
import logger from 'koa-logger'
import { ExternalApiMock } from './external-api-mock/external-api-mock.router'
import { HealthCheckRouter } from './health-check/health-check.rounter'

export class Api extends Koa {
  public constructor() {
    super()

    this.proxy = true // forward for TSL encryption on proxy level
    this.use(logger())
    this.use(new ExternalApiMock('/').routes())
    this.use(new HealthCheckRouter('/health-check').routes())
  }
}
