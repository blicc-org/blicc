import Router from 'koa-router'
import { SessionController } from './session.controller'

export class SessionRouter {
  private router: Router
  private controller: SessionController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new SessionController()
  }

  public routes(): Router.IMiddleware {
    this.router.post('/', this.controller.login.bind(this.controller))
    return this.router.routes()
  }
}
