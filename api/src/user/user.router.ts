import Router from 'koa-router'
import { UserController } from './user.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

export class UserRouter {
  private router: Router
  private controller: UserController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new UserController()
  }

  public routes(): Router.IMiddleware {
    this.router.use(
      '/:id',
      AuthMiddleware.handle,
      PermissionMiddleware.handle.bind(null, 'user')
    )
    this.router.post('/', this.controller.register.bind(this.controller))
    this.router.get('/:id', this.controller.access.bind(this.controller))

    return this.router.routes()
  }
}
