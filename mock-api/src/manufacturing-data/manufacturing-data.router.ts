import Router, { IMiddleware as Middleware } from 'koa-router'
import { ManufacturingDataController } from './manufacturing-data.controller'

export class ManufacturingDataRouter {
  private prefix: string
  private router: Router
  private controller: ManufacturingDataController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = new Router()
    this.controller = new ManufacturingDataController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.get('/', this.controller.mock.bind(this.controller))

    return this.router.routes()
  }
}
