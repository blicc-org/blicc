import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import session from 'koa-session'
import serve from 'koa-static'
import { DataSupplyRouter } from './data-supply/data-supply.router'
import { ApiDocsRouter } from './api-docs/api-docs.router'
import { AdminRouter } from './admin/admin.router'
import { UserRouter } from './user/user.router'
import { SessionRouter } from './session/session.router'

export class App {
  private koa: Koa

  public constructor() {
    this.koa = new Koa()
    this.koa.use(cors({ credentials: true}))
    this.koa.use(logger())
    this.koa.use(bodyParser())
    this.koa.use(session(this.koa))
    this.koa.use(serve(`${__dirname}/../public`))

    this.koa.use(new ApiDocsRouter('/docs').routes())
    this.koa.use(new DataSupplyRouter('/').routes())
    this.koa.use(new AdminRouter('/admin').routes())
    this.koa.use(new UserRouter('/users').routes())
    this.koa.use(new SessionRouter('/sessions').routes())
  }

  public listen(port: number): void {
    this.koa.listen(port)
  }
}
