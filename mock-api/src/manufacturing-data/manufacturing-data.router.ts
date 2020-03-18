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

    /**
     * @swagger
     *
     * /manufacturing-data:
     *   get:
     *     tags:
     *       - Manufacturing data
     *     summary: Manufacturing data mock
     *     description: Request a manufacturing data mock object which simulates live time updates
     *     responses:
     *       200:
     *         description: OK
     *       500:
     *         description: Internal Server Error
     */
    this.router.get('/', this.controller.mock.bind(this.controller))

    return this.router.routes()
  }
}
