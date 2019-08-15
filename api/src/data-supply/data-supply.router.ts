import Router from 'koa-router'
import { DataSupplyController } from './data-supply.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

export class DataSupplyRouter {
  private router: Router
  private controller: DataSupplyController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new DataSupplyController()
  }

  public routes(): Router.IMiddleware {
    this.router.use(
      AuthMiddleware.handle,
      PermissionMiddleware.handle.bind(null, 'user')
    )
    this.router.get('/', this.controller.inform.bind(this.controller))
    this.router.post('/', this.controller.supply.bind(this.controller))
    return this.router.routes()
  }
}
