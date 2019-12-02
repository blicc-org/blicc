import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { ChartController } from './chart.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

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
    this.router.use(bodyParser({ strict: true }))

    /**
     * @swagger
     *
     * /charts:
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
     *       - Charts
     *     summary: Create chart
     *     description: Create a new chart which users can use to build their dashboards.
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
     *                   - bundle
     *                   - path
     *                   properties:
     *                     title:
     *                       type: string
     *                     bundle:
     *                       type: string
     *                     description:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   title: "Pie chart",
     *                   bundle: "Essentials",
     *                   description: "Show your data in a pie chart."
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
     *                   - bundle
     *                   - description
     *                   - userId
     *                   - slug
     *                   - creationDate
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     bundle:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     slug:
     *                       type: string
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "WaDQc9_H",
     *                   title: "Pie chart",
     *                   bundle: "Essentials",
     *                   description: "Show your data in a pie chart.",
     *                   userId: "b1x_S29n",
     *                   slug: "essentials/pie-chart",
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
      method: 'post',
      path: '/',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['developer', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          title: Joi.string().required(),
          bundle: Joi.string().required(),
          description: Joi.string()
            .allow('')
            .optional(),
        },
        output: {
          201: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              bundle: Joi.string().required(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string().required(),
              slug: Joi.string().required(),
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
     * /charts/{id}:
     *   get:
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
     *       - Charts
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *     summary: Get chart
     *     description: Get a specific chart by the given id.
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
     *                   - bundle
     *                   - description
     *                   - userId
     *                   - slug
     *                   - creationDate
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     bundle:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     slug:
     *                       type: string
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "WaDQc9_H",
     *                   title: "Pie chart",
     *                   bundle: "Essentials",
     *                   description: "Show your data in a pie chart.",
     *                   userId: "b1x_S29n",
     *                   slug: "essentials/pie-chart",
     *                   creationDate: "2019-11-02T15:45:58.284Z"
     *                 }
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              bundle: Joi.string().required(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string().required(),
              slug: Joi.string().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.get.bind(this.controller),
    })

    return this.router.middleware()
  }
}
