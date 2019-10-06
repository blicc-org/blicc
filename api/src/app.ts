import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import serve from 'koa-static'
import { ApiDocsRouter } from './api-docs/api-docs.router'
import { AdminRouter } from './admin/admin.router'
import { UserRouter } from './user/user.router'
import { TokenRouter } from './token/token.router'
import { DashboardRouter } from './dashboard/dashboard.router'
import { TwoFactorAuthRouter } from './two-factor-auth/two-factor-auth.router'

export class App {
  private koa: Koa

  public constructor() {
    this.koa = new Koa()

    this.koa.proxy = true // forward for TSL encyrption on edge proxy level
    this.koa.use(cors({ credentials: true }))
    this.koa.use(logger())
    this.koa.use(bodyParser())
    this.koa.use(serve(`${__dirname}/../public`))
    this.koa.use(new ApiDocsRouter('/').routes())
    this.koa.use(new AdminRouter('/admin').routes())
    this.koa.use(new UserRouter('/users').routes())
    this.koa.use(new TokenRouter('/tokens').routes())
    this.koa.use(new DashboardRouter('/dashboards').routes())
    this.koa.use(new TwoFactorAuthRouter('/two-factor-auth').routes())
  }

  public listen(port: number): void {
    this.koa.listen(port)
  }
}
