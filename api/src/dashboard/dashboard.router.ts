import { Middleware } from 'koa'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { DashboardController } from './dashboard.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

export class DashboardRouter {
  private prefix: string
  private router: Router
  private controller: DashboardController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new DashboardController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /dashboards:
     *   post:
     *     security:
     *       - cookieAuth: []
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     produces:
     *       - application/json
     *     tags:
     *       - Dashboards
     *     summary: Create dashboard
     *     description: Create a dasbhoard with the given title and data which includes the setup of the dasboard.
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - dashboard
     *               properties:
     *                 dashboard:
     *                   type: object
     *                   required:
     *                   - title
     *                   - data
     *                   properties:
     *                     title:
     *                       type: string
     *                     data:
     *                       type: json
     *             examples:
     *               filter:
     *                 value: {
     *                   "title": "Dashboard",
     *                   "data": "{}",
     *                 }
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - dashboard
     *               properties:
     *                 dashboard:
     *                   type: object
     *                   required:
     *                   - id
     *                   - title
     *                   - userId
     *                   - data
     *                   - creationDate
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     data:
     *                       type: json
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "WaDQc9_H",
     *                   title: "Dashboard",
     *                   userId: "b1x_S29n",
     *                   data: {},
     *                   creationDate: "2019-11-02T15:45:58.284Z"
     *                 }
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'post',
      path: '/',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          title: Joi.string().required(),
          data: Joi.object().required(),
        },
        output: {
          201: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              userId: Joi.string().required(),
              data: Joi.object().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.create.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /dashboards{id}:
     *   get:
     *     security:
     *       - cookieAuth: []
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     produces:
     *       - application/json
     *     tags:
     *       - Dashboards
     *     summary: Get dashboard by id
     *     description: Get a specific dashboard by the given id.
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - dashboard
     *               properties:
     *                 dashboard:
     *                   type: object
     *                   required:
     *                   - id
     *                   - title
     *                   - userId
     *                   - data
     *                   - creationDate
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     data:
     *                       type: json
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "WaDQc9_H",
     *                   title: "Dashboard",
     *                   userId: "b1x_S29n",
     *                   data: {},
     *                   creationDate: "2019-11-02T15:45:58.284Z"
     *                 }
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              userId: Joi.string().required(),
              data: Joi.object().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.access.bind(this.controller),
    })

    return this.router.middleware()
  }
}
