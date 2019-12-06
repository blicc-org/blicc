import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router } from 'koa-joi-router'
import { DataSourceController } from './data-source.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

export class DataSourceRouter {
  private prefix: string
  private router: Router
  private controller: DataSourceController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new DataSourceController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.use(bodyParser({ strict: true }))

    this.router.route({
      method: 'post',
      path: '/',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['admin']),
      ],
      handler: this.controller.create.bind(this.controller),
    })

    return this.router.middleware()
  }
}
