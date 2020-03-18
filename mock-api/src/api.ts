import Koa from 'koa'
import logger from 'koa-logger'
import { TimeRouter } from './time/time.router'
import { HealthCheckRouter } from './health-check/health-check.rounter'
import { WeatherRouter } from './weather/weather.router'

export class Api extends Koa {
  public constructor() {
    super()

    this.proxy = true // forward for TSL encryption on proxy level
    this.use(logger())
    this.use(new TimeRouter('/time').routes())
    this.use(new WeatherRouter('/weather').routes())
    this.use(new TimeRouter('/manufacturing-data').routes())
    this.use(new HealthCheckRouter('/health-check').routes())
  }
}
