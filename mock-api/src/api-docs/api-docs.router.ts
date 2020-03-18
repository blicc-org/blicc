import { ApiDocsController } from './api-docs.controller'
import Router, { IMiddleware as Middleware } from 'koa-router'

export class ApiDocsRouter {
  private prefix: string
  private router: Router
  private controller: ApiDocsController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = new Router()
    this.controller = new ApiDocsController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.get(
      '/specs.json',
      this.controller.swagger.bind(this.controller)
    )

    return this.router.routes()
  }
}
