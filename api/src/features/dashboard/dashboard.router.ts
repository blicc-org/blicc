import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { DashboardController } from './dashboard.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

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
    this.router.use(bodyParser({ strict: true }))

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
     *                     description:
     *                       type: string
     *                     data:
     *                       type: json
     *             examples:
     *               filter:
     *                 value: {
     *                   title: "Dashboard",
     *                   description: "This dashboard illustrates...",
     *                   data: "{}",
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
     *                   - description
     *                   - userId
     *                   - data
     *                   - creationDate
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
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
     *                   description: "This dashboard illustrates...",
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
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          title: Joi.string().required(),
          description: Joi.string()
            .allow('')
            .optional(),
          data: Joi.object().required(),
        },
        output: {
          201: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              description: Joi.string()
                .allow('')
                .optional(),
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
     * /dashboards/{id}:
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
     *                   - description
     *                   - userId
     *                   - data
     *                   - creationDate
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
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
     *                   description: "Dashboard",
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
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string().required(),
              data: Joi.object().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.access.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /dashboards:
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
     *       - Dashboards
     *     parameters:
     *       - in: query
     *         name: fields
     *         schema:
     *           type: array
     *         style: form
     *         explode: false
     *         description: Concatenate field names you want to receive like this ?fields=id,title,userId,creationDate,data . If you do not provide the field query you get all fields.
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Select dashboards where the title matches the given search term like ?search=profit
     *       - in: query
     *         name: skip
     *         schema:
     *           type: number
     *         description: Defines the offset of the requested dashboards.
     *       - in: query
     *         name: take
     *         schema:
     *           type: number
     *         description: Defines the amount of the requested dashboards.
     *     summary: List dashboards
     *     description: List dashboards by given filter.
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - dashboards
     *               properties:
     *                 total:
     *                   type: number
     *                 dashboards:
     *                   type: object
     *                   properties:
     *                     dashboard:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: string
     *                         title:
     *                           type: string
     *                         description:
     *                           type: string
     *                         userId:
     *                           type: string
     *                         data:
     *                           type: json
     *                         creationDate:
     *                           type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   total: 2,
     *                   dashboards: [
     *                     {
     *                       id: "WaDQc9_H",
     *                       title: "Dashboard 1",
     *                       description: "This describes dashboard 1",
     *                       userId: "b1x_S29n",
     *                       data: {},
     *                       creationDate: "2019-11-02T15:45:58.284Z"
     *                     },
     *                     {
     *                       id: "vUtM3jpW",
     *                       title: "Dashboard 2",
     *                       description: "This describes dashboard 2",
     *                       userId: "0FTY2Ne8",
     *                       data: {},
     *                       creationDate: "2019-10-01T11:32:12.534Z"
     *                     },
     *                   ]
     *                 }
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              total: Joi.number().required(),
              dashboards: Joi.array().items({
                id: Joi.string(),
                title: Joi.string(),
                description: Joi.string()
                  .allow('')
                  .optional(),
                userId: Joi.string(),
                data: Joi.object(),
                creationDate: Joi.string(),
              }),
            },
          },
        },
      },
      handler: this.controller.list.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /dashboards/{id}:
     *   put:
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
     *     summary: Update dashboard
     *     description: Update dashboard by id.
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
     *                     description:
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
     *                   title: "New Title",
     *                   description: "This dashboard illustrates...",
     *                   userId: "b1x_S29n",
     *                   data: {},
     *                   creationDate: "2019-11-02T15:45:58.284Z"
     *                 }
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
     *                     description:
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
     *                   title: "New Title",
     *                   description: "This dashboard illustrates...",
     *                   userId: "b1x_S29n",
     *                   data: {},
     *                   creationDate: "2019-11-02T15:45:58.284Z"
     *                 }
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'put',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          id: Joi.string().required(),
          title: Joi.string().required(),
          description: Joi.string()
            .allow('')
            .optional(),
          userId: Joi.string().required(),
          data: Joi.object().required(),
          creationDate: Joi.string().required(),
        },
        output: {
          200: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string().required(),
              data: Joi.object().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.update.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /dashboards/{id}:
     *   delete:
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
     *     summary: Delete dashboard
     *     description: Delete dashboard by id.
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
     *                   - title
     *                   - description
     *                   - userId
     *                   - data
     *                   - creationDate
     *                   properties:
     *                     title:
     *                       type: string
     *                     description:
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
     *                   title: "Dashboard",
     *                   description: "This dashboard illustrates....",
     *                   userId: "b1x_S29n",
     *                   data: "{}",
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
      method: 'delete',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              title: Joi.string().required(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string().required(),
              data: Joi.object().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.delete.bind(this.controller),
    })

    return this.router.middleware()
  }
}
