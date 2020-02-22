import Router, { IMiddleware as Middleware } from 'koa-router'
import { ApiMockController } from './api-mock.controller'

export class ApiMockRouter {
  private prefix: string
  private router: Router
  private controller: ApiMockController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = new Router()
    this.controller = new ApiMockController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.get('/', this.controller.mock.bind(this.controller))

    return this.router.routes()
  }
}
