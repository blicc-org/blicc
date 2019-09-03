import Router from 'koa-router'
import { SessionController } from './session.controller'

export class SessionRouter {
  private router: Router
  private controller: SessionController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new SessionController()
  }

  public routes(): Router.IMiddleware {
    /**
     * @swagger
     *
     * /sessions:
     *   post:
     *     tags:
     *       - Sessions
     *     summary: Open session
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     description: Register a user
     *     produces:
     *       - application/json
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - dataFilter
     *               properties:
     *                 dataFilter:
     *                   type: object
     *                   required:
     *                   - dateFrom
     *                   - dateTo
     *                   properties:
     *                     dateFrom:
     *                       type: string
     *                       format: date-time
     *                       description: RFC 3339
     *                     dateTo:
     *                       type: string
     *                       format: date-time
     *                       description: RFC 3339
     *             examples:
     *               filter:
     *                 value: {
     *                   dateFrom: '2018-07-31T22:00:00.000Z',
     *                   dateTo: '2018-08-14T22:00:00.000Z'
     *                 }
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           text/html:
     *             schema:
     *               required:
     *               - path
     *               properties:
     *                 path:
     *                   type: string
     *                   description: Qlik content library path to .csv data file
     *             examples:
     *               filter:
     *                 value: "/data_tenantId.csv"
     *       500:
     *         description: Internal Server Error response.
     */
    this.router.post('/', this.controller.login.bind(this.controller))

    return this.router.routes()
  }
}
