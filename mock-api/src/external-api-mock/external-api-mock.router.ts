import Router, { IMiddleware as Middleware } from 'koa-router'
import { DataDeliveryMockController } from './external-api-mock'

export class ExternalApiMock {
  private prefix: string
  private router: Router
  private controller: DataDeliveryMockController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = new Router()
    this.controller = new DataDeliveryMockController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.get('/', this.controller.mock.bind(this.controller))

    return this.router.routes()
  }
}
