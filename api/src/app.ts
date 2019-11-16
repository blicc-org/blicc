import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import serve from 'koa-static'
import { ApiDocsRouter } from './features/api-docs/api-docs.router'
import { AdminRouter } from './features/admin/admin.router'
import { UserRouter } from './features/user/user.router'
import { TokenRouter } from './features/token/token.router'
import { DashboardRouter } from './features/dashboard/dashboard.router'
import { TwoFactorAuthRouter } from './features/two-factor-auth/two-factor-auth.router'

export class App extends Koa {
  public constructor() {
    super()

    this.proxy = true // forward for TSL encyrption on edge proxy level
    this.use(cors({ credentials: true }))
    this.use(logger())
    this.use(bodyParser())
    this.use(serve(`${__dirname}/../public`))
    this.use(new ApiDocsRouter('/').routes())
    this.use(new AdminRouter('/admin').routes())
    this.use(new UserRouter('/users').routes())
    this.use(new TokenRouter('/tokens').routes())
    this.use(new DashboardRouter('/dashboards').routes())
    this.use(new TwoFactorAuthRouter('/two-factor-auth').routes())
  }
}
