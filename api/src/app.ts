import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import session from 'koa-session'
import serve from 'koa-static'
import { DataSupplyRouter } from './data-supply/data-supply.router'
import { ApiDocsRouter } from './api-docs/api-docs.router'
import { UserRouter } from './user/user.router'
import { createConnection } from 'typeorm'

export class App {
  private koa: Koa

  public constructor() {
    this.koa = new Koa()
    this.koa.use(cors())
    this.koa.use(logger())
    this.koa.use(bodyParser())
    this.koa.use(session(this.koa))
    this.koa.use(serve(`${__dirname}/../public`))

    this.koa.use(new ApiDocsRouter('/docs').routes())
    this.koa.use(new DataSupplyRouter('/').routes())
    this.koa.use(new UserRouter('/users').routes())
  }

  public async connect(): Promise<void> {
    await createConnection()
  }

  public listen(port: number): void {
    this.koa.listen(port)
  }
}
