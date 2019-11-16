import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { AdminController } from './admin.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

export class AdminRouter {
  private prefix: string
  private router: Router
  private controller: AdminController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new AdminController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    this.router.route({
      method: 'get',
      path: '/',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'admin']),
      ],
      handler: this.controller.settings.bind(this.controller),
    })

    return this.router.middleware()
  }
}
