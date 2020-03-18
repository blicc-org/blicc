import Koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'
import { TimeRouter } from './time/time.router'
import { WeatherRouter } from './weather/weather.router'
import { ManufacturingDataRouter } from './manufacturing-data/manufacturing-data.router'
import { HealthCheckRouter } from './health-check/health-check.rounter'
import { ApiDocsRouter } from './api-docs/api-docs.router'

export class Api extends Koa {
  public constructor() {
    super()

    this.proxy = true // forward for TSL encryption on proxy level
    this.use(logger())
    this.use(serve(`${__dirname}/../public`))
    this.use(new ApiDocsRouter('/').routes())
    this.use(new TimeRouter('/time').routes())
    this.use(new WeatherRouter('/weather').routes())
    this.use(new ManufacturingDataRouter('/manufacturing-data').routes())
    this.use(new HealthCheckRouter('/health-check').routes())
  }
}
