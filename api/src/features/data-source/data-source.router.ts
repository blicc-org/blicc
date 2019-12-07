import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { DataSourceController } from './data-source.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

export class DataSourceRouter {
  private prefix: string
  private router: Router
  private controller: DataSourceController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new DataSourceController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.use(bodyParser({ strict: true }))

    /**
     * @swagger
     *
     * /data-sources:
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
     *       - Data Source
     *     summary: Create data source
     *     description: Create a new data source.
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - data-source
     *               properties:
     *                 data-source:
     *                   type: object
     *                   required:
     *                   - title
     *                   - requestConfig
     *                   - persistData
     *                   - fetchFrequency
     *                   properties:
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     requestConfig:
     *                       type: json
     *                     persistData:
     *                       type: boolean
     *                     fetchFrequency:
     *                       type: number
     *             examples:
     *               filter:
     *                 value: {
     *                   title: "Api",
     *                   description: "Fetch data from a Api",
     *                   requestConfig: {},
     *                   persistData: false,
     *                   fetchFrequency: 86400000
     *                 }
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - data-source
     *               properties:
     *                 data-source:
     *                   type: object
     *                   required:
     *                   - id
     *                   - title
     *                   - description
     *                   - userId
     *                   - requestConfig
     *                   - creationDate
     *                   - persistData
     *                   - fetchFrequency
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     requestConfig:
     *                       type: json
     *                     creationDate:
     *                       type: string
     *                     persistData:
     *                       type: boolean
     *                     fetchFrequency:
     *                       type: number
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "3cT4lb0M",
     *                   title: "Api",
     *                   description: "Fetch data from a Api",
     *                   userId: "sNTKqvsS",
     *                   requestConfig: {},
     *                   persistData: false,
     *                   fetchFrequency: 86400000,
     *                   creationDate: "2019-12-06T16:12:21.944Z"
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
          title: Joi.string(),
          description: Joi.string()
            .allow('')
            .optional(),
          requestConfig: Joi.object(),
          persistData: Joi.boolean(),
          fetchFrequency: Joi.number(),
        },
        output: {
          201: {
            body: {
              id: Joi.string(),
              title: Joi.string(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string(),
              requestConfig: Joi.object(),
              creationDate: Joi.string(),
              persistData: Joi.boolean(),
              fetchFrequency: Joi.number(),
            },
          },
        },
      },
      handler: this.controller.create.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /data-sources/{id}:
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
     *       - Data Source
     *     summary: Get data source
     *     description: Get a specific data source by the given id.
     *     responses:
     *       200:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - data-source
     *               properties:
     *                 data-source:
     *                   type: object
     *                   required:
     *                   - id
     *                   - title
     *                   - description
     *                   - userId
     *                   - requestConfig
     *                   - creationDate
     *                   - persistData
     *                   - fetchFrequency
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     requestConfig:
     *                       type: json
     *                     creationDate:
     *                       type: string
     *                     persistData:
     *                       type: boolean
     *                     fetchFrequency:
     *                       type: number
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "3cT4lb0M",
     *                   title: "Api",
     *                   description: "Fetch data from a Api",
     *                   userId: "sNTKqvsS",
     *                   requestConfig: {},
     *                   persistData: false,
     *                   fetchFrequency: 86400000,
     *                   creationDate: "2019-12-06T16:12:21.944Z"
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
              id: Joi.string(),
              title: Joi.string(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string(),
              requestConfig: Joi.object(),

              creationDate: Joi.string(),
              persistData: Joi.boolean(),
              fetchFrequency: Joi.number(),
            },
          },
        },
      },
      handler: this.controller.access.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /data-sources:
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
     *       - Data Source
     *     parameters:
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Select data sources where the title matches the given search term like ?search=api
     *       - in: query
     *         name: skip
     *         schema:
     *           type: number
     *         description: Defines the offset of the requested data sources.
     *       - in: query
     *         name: take
     *         schema:
     *           type: number
     *         description: Defines the amount of the requested data sources.
     *     summary: List data sources
     *     description: List all the data sources.
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - data-sources
     *               properties:
     *                 total:
     *                   type: number
     *                 data-sources:
     *                   type: object
     *                   properties:
     *                     data-source:
     *                       type: object
     *                       required:
     *                       - id
     *                       - title
     *                       - description
     *                       - userId
     *                       - requestConfig
     *                       - creationDate
     *                       - persistData
     *                       - fetchFrequency
     *                       properties:
     *                         id:
     *                           type: string
     *                         title:
     *                           type: string
     *                         description:
     *                           type: string
     *                         userId:
     *                           type: string
     *                         requestConfig:
     *                           type: json
     *                         creationDate:
     *                           type: string
     *                         persistData:
     *                           type: boolean
     *                         fetchFrequency:
     *                           type: number
     *             examples:
     *               filter:
     *                 value: {
     *                   total: 1,
     *                   data-sources: [
     *                     {
     *                       id: "3cT4lb0M",
     *                       title: "Api",
     *                       description: "Fetch data from a Api",
     *                       userId: "sNTKqvsS",
     *                       requestConfig: {},
     *                       persistData: false,
     *                       fetchFrequency: 86400000,
     *                       creationDate: "2019-12-06T16:12:21.944Z"
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
              dataSources: Joi.array().items({
                id: Joi.string(),
                title: Joi.string(),
                description: Joi.string()
                  .allow('')
                  .optional(),
                userId: Joi.string(),
                requestConfig: Joi.object(),
                creationDate: Joi.string(),
                persistData: Joi.boolean(),
                fetchFrequency: Joi.number(),
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
     * /data-sources/{id}:
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
     *       - Data Source
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     summary: Update data source
     *     description: Update a data source by the given id.
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - data-source
     *               properties:
     *                 data-source:
     *                   type: object
     *                   required:
     *                   - id
     *                   - title
     *                   - description
     *                   - userId
     *                   - requestConfig
     *                   - creationDate
     *                   - persistData
     *                   - fetchFrequency
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     requestConfig:
     *                       type: json
     *                     creationDate:
     *                       type: string
     *                     persistData:
     *                       type: boolean
     *                     fetchFrequency:
     *                       type: number
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "3cT4lb0M",
     *                   title: "Api",
     *                   description: "Fetch data from the api",
     *                   userId: "sNTKqvsS",
     *                   requestConfig: {},
     *                   persistData: false,
     *                   fetchFrequency: 86400000,
     *                   creationDate: "2019-12-06T16:12:21.944Z"
     *                 }
     *     responses:
     *       200:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - data-source
     *               properties:
     *                 data-source:
     *                   type: object
     *                   required:
     *                   - id
     *                   - title
     *                   - description
     *                   - userId
     *                   - requestConfig
     *                   - creationDate
     *                   - persistData
     *                   - fetchFrequency
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     requestConfig:
     *                       type: json
     *                     creationDate:
     *                       type: string
     *                     persistData:
     *                       type: boolean
     *                     fetchFrequency:
     *                       type: number
     *             examples:
     *               filter:
     *                 value: {
     *                   id: "3cT4lb0M",
     *                   title: "Updated api",
     *                   description: "Fetch data from the updated api",
     *                   userId: "sNTKqvsS",
     *                   requestConfig: {},
     *                   persistData: true,
     *                   fetchFrequency: 60000,
     *                   creationDate: "2019-12-06T16:12:21.944Z"
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
          id: Joi.string(),
          title: Joi.string(),
          description: Joi.string()
            .allow('')
            .optional(),
          userId: Joi.string(),
          requestConfig: Joi.object(),
          creationDate: Joi.string(),
          persistData: Joi.boolean(),
          fetchFrequency: Joi.number(),
        },
        output: {
          200: {
            body: {
              id: Joi.string(),
              title: Joi.string(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string(),
              requestConfig: Joi.object(),
              creationDate: Joi.string(),
              persistData: Joi.boolean(),
              fetchFrequency: Joi.number(),
            },
          },
        },
      },
      handler: this.controller.update.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /data-sources/{id}:
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
     *       - Data Source
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     summary: Delete data source
     *     description: Delete a data source by the given id.
     *     responses:
     *       200:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - data-source
     *               properties:
     *                 data-source:
     *                   type: object
     *                   required:
     *                   - title
     *                   - description
     *                   - userId
     *                   - requestConfig
     *                   - creationDate
     *                   - persistData
     *                   - fetchFrequency
     *                   properties:
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     userId:
     *                       type: string
     *                     requestConfig:
     *                       type: json
     *                     creationDate:
     *                       type: string
     *                     persistData:
     *                       type: boolean
     *                     fetchFrequency:
     *                       type: number
     *             examples:
     *               filter:
     *                 value: {
     *                   title: "Api",
     *                   description: "Fetch data from the Api",
     *                   userId: "sNTKqvsS",
     *                   requestConfig: {},
     *                   persistData: false,
     *                   fetchFrequency: 86400000,
     *                   creationDate: "2019-12-06T16:12:21.944Z"
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
              title: Joi.string(),
              description: Joi.string()
                .allow('')
                .optional(),
              userId: Joi.string(),
              requestConfig: Joi.object(),
              creationDate: Joi.string(),
              persistData: Joi.boolean(),
              fetchFrequency: Joi.number(),
            },
          },
        },
      },
      handler: this.controller.remove.bind(this.controller),
    })

    return this.router.middleware()
  }
}
