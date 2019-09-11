import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { AdminController } from './admin.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

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
    this.router.use(
      AuthMiddleware.handle,
      PermissionMiddleware.handle.bind(null, 'admin')
    )

    this.router.route({
      method: 'get',
      path: '/',
      handler: this.controller.settings.bind(this.controller),
    })

    return this.router.middleware()
  }
}
