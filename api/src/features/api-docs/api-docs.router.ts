import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { ApiDocsController } from './api-docs.controller'

export class ApiDocsRouter {
  private prefix: string
  private router: Router
  private controller: ApiDocsController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new ApiDocsController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    this.router.route({
      method: 'get',
      path: '/specs.json',
      handler: this.controller.swagger.bind(this.controller),
    })

    return this.router.middleware()
  }
}
