import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import session from 'koa-session'
import serve from 'koa-static'
import websocket from 'socket.io'
import http from 'http'
import { DataSupplyRouter } from './data-supply/data-supply.router'
import { ApiDocsRouter } from './api-docs/api-docs.router'
import { AdminRouter } from './admin/admin.router'
import { UserRouter } from './user/user.router'
import { SessionRouter } from './session/session.router'

export class App {
  private koa: Koa
  private server: http.Server
  private socket: websocket.Server

  public constructor() {
    this.koa = new Koa()
    this.server = http.createServer(this.koa.callback())
    this.socket = websocket(this.server)

    /**
     * prevent checking for https encryption behind reverse proxy
     */
    this.koa.proxy = true

    this.koa.use(cors({ credentials: true }))
    this.koa.use(logger())
    this.koa.use(bodyParser())
    this.koa.use(session(this.koa))
    this.koa.use(serve(`${__dirname}/../public`))

    this.koa.use(new ApiDocsRouter('/docs').routes())
    this.koa.use(new DataSupplyRouter('/').routes())
    this.koa.use(new AdminRouter('/admin').routes())
    this.koa.use(new UserRouter('/users').routes())
    this.koa.use(new SessionRouter('/sessions').routes())

    this.socket.on('connection', socket => {
      console.log('Client has connected with socket id: ' + socket.id)
    })
  }

  public listen(port: number): void {
    this.server.listen(port)
  }
}
