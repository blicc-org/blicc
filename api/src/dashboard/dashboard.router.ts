import Router from 'koa-router'
import { DashboardController } from './dashboard.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

export class DashboardRouter {
  private router: Router
  private controller: DashboardController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new DashboardController()
  }

  public routes(): Router.IMiddleware {
    this.router.use(
      AuthMiddleware.handle,
      PermissionMiddleware.handle.bind(null, 'user')
    )
    this.router.get('/', this.controller.list.bind(this.controller))
    this.router.post('/', this.controller.create.bind(this.controller))

    return this.router.routes()
  }
}
