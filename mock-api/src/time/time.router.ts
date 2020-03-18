import Router, { IMiddleware as Middleware } from 'koa-router'
import { TimeController } from './time.controller'

export class TimeRouter {
  private prefix: string
  private router: Router
  private controller: TimeController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = new Router()
    this.controller = new TimeController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /time:
     *   get:
     *     tags:
     *       - Time
     *     summary: Time mock
     *     description: Request a data object which gives you information about the current time
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
