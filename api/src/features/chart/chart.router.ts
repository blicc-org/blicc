import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { ChartController } from './chart.controller'

export class ChartRouter {
  private prefix: string
  private router: Router
  private controller: ChartController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new ChartController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    this.router.route({
      method: 'get',
      path: '/',
      handler: this.controller.get.bind(this.controller),
    })
    return this.router.middleware()
  }
}
