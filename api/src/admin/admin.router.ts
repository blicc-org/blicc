import Router from 'koa-router'
import { AdminController } from './admin.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

export class AdminRouter {
  private router: Router
  private controller: AdminController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new AdminController()
  }

  public routes(): Router.IMiddleware {
    this.router.use(
      AuthMiddleware.handle,
      PermissionMiddleware.handle.bind(null, 'admin')
    )
    this.router.get('/', this.controller.settings.bind(this.controller))
    return this.router.routes()
  }
}
