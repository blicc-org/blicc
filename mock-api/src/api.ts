import Koa from 'koa'
import logger from 'koa-logger'
import { ApiMockRouter } from './external-api-mock/api-mock.router'
import { HealthCheckRouter } from './health-check/health-check.router'

export class Api extends Koa {
  public constructor() {
    super()

    this.proxy = true // forward for TSL encryption on proxy level
    this.use(logger())
    this.use(new ApiMockRouter('/').routes())
    this.use(new HealthCheckRouter('/health-check').routes())
  }
}
