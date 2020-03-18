import Router, { IMiddleware as Middleware } from 'koa-router'
import { HealthCheckController } from './health-check.controller'

export class HealthCheckRouter {
  private prefix: string
  private router: Router
  private controller: HealthCheckController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = new Router()
    this.controller = new HealthCheckController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.get('/', this.controller.check.bind(this.controller))

    return this.router.routes()
  }
}
