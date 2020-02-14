import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router } from 'koa-joi-router'
import { DataDeliveryMockController } from './data-delivery-mock.controller'

export class DataDeliveryMockRouter {
  private prefix: string
  private router: Router
  private controller: DataDeliveryMockController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new DataDeliveryMockController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.use(bodyParser({ strict: true }))

    this.router.route({
      method: 'get',
      path: '/',
      handler: this.controller.mock.bind(this.controller),
    })

    return this.router.middleware()
  }
}
