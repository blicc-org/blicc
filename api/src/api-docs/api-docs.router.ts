import Router from 'koa-router'
import { ApiDocsController } from './api-docs.controller'

export class ApiDocsRouter {
  private router: Router
  private controller: ApiDocsController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new ApiDocsController()
  }

  public routes(): Router.IMiddleware {
    this.router.get(
      '/swagger.json',
      this.controller.swagger.bind(this.controller)
    )
    return this.router.routes()
  }
}
