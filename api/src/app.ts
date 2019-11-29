import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import serve from 'koa-static'
import { ApiDocsRouter } from './features/api-docs'
import { AdminRouter } from './features/admin'
import { UserRouter } from './features/user'
import { TokenRouter } from './features/token'
import { DashboardRouter } from './features/dashboard'
import { TwoFactorAuthRouter } from './features/two-factor-auth'
import { HealthCheckRouter } from './features/health-check/health-check.router'
import { ChartRouter } from './features/chart/chart.router'

export class App extends Koa {
  public constructor() {
    super()

    this.proxy = true // forward for TSL encyrption on edge proxy level
    this.use(cors({ credentials: true }))
    this.use(logger())
    this.use(bodyParser())
    this.use(serve(`${__dirname}/../public`))
    this.use(new ApiDocsRouter('/').routes())
    this.use(new AdminRouter('/admins').routes())
    this.use(new UserRouter('/users').routes())
    this.use(new ChartRouter('/charts').routes())
    this.use(new TokenRouter('/tokens').routes())
    this.use(new DashboardRouter('/dashboards').routes())
    this.use(new HealthCheckRouter('/health-check').routes())
    this.use(new TwoFactorAuthRouter('/two-factor-auth').routes())
  }
}
