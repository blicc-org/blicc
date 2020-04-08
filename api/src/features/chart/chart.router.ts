import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { ChartController } from './chart.controller'
import { AuthMiddleware, PermissionMiddleware } from '../../common/middleware'

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
     *                   - key
     *                   - slug
     *                   properties:
     *                     title:
     *                       type: string
     *                     bundle:
     *                       type: string
     *                     description:
     *                       type: string
     *                     key:
     *                       type: string
     *                     slug:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   title: "Pie chart",
     *                   bundle: "Essentials",
     *                   description: "Show your data in a pie chart.",
     *                   key: "PieChart",
     *                   slug: "essentials"
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
     *                   - key
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
     *                     key:
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
     *                   key: "PieChart",
     *                   slug: "essentials",
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
          description: Joi.string().allow('').optional(),
          key: Joi.string().required(),
          slug: Joi.string().required(),
        },
        output: {
          201: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              bundle: Joi.string().required(),
              description: Joi.string().allow('').optional(),
              userId: Joi.string().required(),
              key: Joi.string().required(),
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
     *         name: id
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
     *               - chart
     *               properties:
     *                 chart:
     *                   type: object
     *                   required:
     *                   - id
     *                   - title
     *                   - bundle
     *                   - description
     *                   - userId
     *                   - key
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
     *                     key:
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
     *                   key: "PieChart",
     *                   slug: "essentials",
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
              description: Joi.string().allow('').optional(),
              userId: Joi.string().required(),
              key: Joi.string().required(),
              slug: Joi.string().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.get.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /charts:
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
     *       - in: query
     *         name: fields
     *         schema:
     *           type: number
     *         description: Define the fields which should be returned like fields=id,title,bundle,description,userId,creationDate,slug
     *       - in: query
     *         name: skip
     *         schema:
     *           type: number
     *         description: Defines the offset of the requested charts.
     *       - in: query
     *         name: take
     *         schema:
     *           type: number
     *         description: Defines the amount of the requested charts.
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Select charts where the title matches the given search term like ?search=pie+chart
     *     summary: List charts
     *     description: List all available charts
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - charts
     *               properties:
     *                 total:
     *                   type: number
     *                 charts:
     *                   type: object
     *                   properties:
     *                     chart:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: string
     *                         title:
     *                           type: string
     *                         bundle:
     *                           type: string
     *                         description:
     *                           type: string
     *                         userId:
     *                           type: string
     *                         key:
     *                           type: string
     *                         slug:
     *                           type: string
     *                         creationDate:
     *                           type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   total: 2,
     *                   charts: [
     *                     {
     *                       id: "WaDQc9_H",
     *                       title: "Pie chart",
     *                       bundle: "Essentials",
     *                       description: "Show your data in a pie chart.",
     *                       userId: "b1x_S29n",
     *                       key: "PieChart",
     *                       slug: "essentials",
     *                       creationDate: "2019-11-02T15:45:58.284Z"
     *                     },
     *                     {
     *                       id: "Wdhs34A",
     *                       title: "Line chart",
     *                       bundle: "Essentials",
     *                       description: "Show your data in a line chart.",
     *                       userId: "b1x_S29n",
     *                       key: "LineChart",
     *                       slug: "essentials",
     *                       creationDate: "2019-12-02T11:45:58.283Z"
     *                     },
     *                   ]
     *                 }
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
              charts: Joi.array().items({
                id: Joi.string(),
                title: Joi.string(),
                bundle: Joi.string(),
                description: Joi.string().allow('').optional(),
                userId: Joi.string(),
                key: Joi.string(),
                slug: Joi.string(),
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
     * /charts/{id}:
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
     *       - Charts
     *     summary: Update chart
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     description: Update a chart by the given id.
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
     *                   - bundle
     *                   - description
     *                   - userId
     *                   - key
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
     *                     key:
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
     *                   key: "PieChart",
     *                   slug: "essentials",
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
     *                   - bundle
     *                   - description
     *                   - userId
     *                   - key
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
     *                     key:
     *                       type: string
     *                     slug:
     *                       type: string
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "WaDQc9_H",
     *                   title: "Updated Title",
     *                   bundle: "Essentials",
     *                   description: "Updated description.",
     *                   userId: "b1x_S29n",
     *                   key: "UpdatedTitle",
     *                   slug: "essentials",
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
      method: 'put',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['developer', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          id: Joi.string().required(),
          title: Joi.string().required(),
          bundle: Joi.string().required(),
          description: Joi.string().allow('').optional(),
          userId: Joi.string().required(),
          key: Joi.string().required(),
          slug: Joi.string().required(),
          creationDate: Joi.string().required(),
        },
        output: {
          200: {
            body: {
              id: Joi.string().required(),
              title: Joi.string().required(),
              bundle: Joi.string().required(),
              description: Joi.string().allow('').optional(),
              userId: Joi.string().required(),
              key: Joi.string().required(),
              slug: Joi.string().required(),
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
     * /charts/{id}:
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
     *       - Charts
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     summary: Delete chart
     *     description: Delete a chart by the given id.
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
     *                   - bundle
     *                   - description
     *                   - userId
     *                   - key
     *                   - slug
     *                   - creationDate
     *                   properties:
     *                     title:
     *                       type: string
     *                     bundle:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     key:
     *                       type: string
     *                     slug:
     *                       type: string
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   title: "Pie Chart",
     *                   bundle: "Essentials",
     *                   description: "Updated description.",
     *                   userId: "b1x_S29n",
     *                   key: "PieChart",
     *                   slug: "essentials",
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
        PermissionMiddleware.handle.bind(null, ['developer', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              title: Joi.string().required(),
              bundle: Joi.string().required(),
              description: Joi.string().allow('').optional(),
              userId: Joi.string().required(),
              key: Joi.string().required(),
              slug: Joi.string().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.remove.bind(this.controller),
    })

    return this.router.middleware()
  }
}
