import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import serve from 'koa-static'
import { ApiDocsRouter } from './features/api-docs'
import { UserRouter } from './features/user'
import { TokenRouter } from './features/token'
import { DashboardRouter } from './features/dashboard'
import { TwoFactorAuthRouter } from './features/two-factor-auth'
import { HealthCheckRouter } from './features/health-check'
import { ChartRouter } from './features/chart'
import { PluginDataRouter } from './features/plugin-data'
import { DataSourceRouter } from './features/data-source/data-source.router'

export class App extends Koa {
  public constructor() {
    super()

    this.proxy = true // forward for TSL encryption on proxy level
    this.use(logger())
    this.use(cors({ credentials: true }))
    this.use(serve(`${__dirname}/../public`))
    this.use(new ApiDocsRouter('/').routes())
    this.use(new UserRouter('/users').routes())
    this.use(new ChartRouter('/charts').routes())
    this.use(new TokenRouter('/tokens').routes())
    this.use(new DashboardRouter('/dashboards').routes())
    this.use(new DataSourceRouter('/data-source').routes())
    this.use(new PluginDataRouter('/plugin-data').routes())
    this.use(new HealthCheckRouter('/health-check').routes())
    this.use(new TwoFactorAuthRouter('/two-factor-auth').routes())
  }
}
