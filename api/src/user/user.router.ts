import Router from 'koa-router'
import { UserController } from './user.controller'

export class UserRouter {
  private router: Router
  private controller: UserController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new UserController()
  }

  public routes(): Router.IMiddleware {
    this.router.get('/', this.controller.verify.bind(this.controller))
    this.router.post('/', this.controller.update.bind(this.controller))
    return this.router.routes()
  }
}
