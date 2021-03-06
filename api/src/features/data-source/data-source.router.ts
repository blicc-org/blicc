import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { DataSourceController } from './data-source.controller'
import { AuthMiddleware, PermissionMiddleware } from '../../common/middleware'

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
     *                   title: "Api",
     *                   description: "Fetch data from a Api",
     *                   data: {},
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
     *                   id: "3cT4lb0M",
     *                   title: "Api",
     *                   description: "Fetch data from a Api",
     *                   userId: "sNTKqvsS",
     *                   data: {},
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
          description: Joi.string().allow('').optional(),
          data: Joi.object(),
        },
        output: {
          201: {
            body: {
              id: Joi.string(),
              title: Joi.string(),
              description: Joi.string().allow('').optional(),
              userId: Joi.string(),
              data: Joi.object(),
              creationDate: Joi.string(),
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
     *                   id: "3cT4lb0M",
     *                   title: "Api",
     *                   description: "Fetch data from a Api",
     *                   userId: "sNTKqvsS",
     *                   data: {},
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
              description: Joi.string().allow('').optional(),
              userId: Joi.string(),
              data: Joi.object(),
              creationDate: Joi.string(),
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
     *         name: fields
     *         schema:
     *           type: string
     *         description: Define the fields you want to select like fields=id,title,description,userId,data,creationDate
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
     *               - dataSources
     *               properties:
     *                 total:
     *                   type: number
     *                 dataSources:
     *                   type: object
     *                   properties:
     *                     data-source:
     *                       type: object
     *                       required:
     *                       - id
     *                       - title
     *                       - description
     *                       - userId
     *                       - data
     *                       - creationDate
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
     *                   total: 1,
     *                   dataSources: [
     *                     {
     *                       id: "3cT4lb0M",
     *                       title: "Api",
     *                       description: "Fetch data from a Api",
     *                       userId: "sNTKqvsS",
     *                       data: {},
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
                description: Joi.string().allow('').optional(),
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
     *                   id: "3cT4lb0M",
     *                   title: "Api",
     *                   description: "Fetch data from the api",
     *                   userId: "sNTKqvsS",
     *                   data: {},
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
     *                   id: "3cT4lb0M",
     *                   title: "Updated api",
     *                   description: "Fetch data from the updated api",
     *                   userId: "sNTKqvsS",
     *                   data: {},
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
          description: Joi.string().allow('').optional(),
          userId: Joi.string(),
          data: Joi.object(),
          creationDate: Joi.string(),
        },
        output: {
          200: {
            body: {
              id: Joi.string(),
              title: Joi.string(),
              description: Joi.string().allow('').optional(),
              userId: Joi.string(),
              data: Joi.object(),
              creationDate: Joi.string(),
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
     *                   title: "Api",
     *                   description: "Fetch data from the Api",
     *                   userId: "sNTKqvsS",
     *                   data: {},
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
              description: Joi.string().allow('').optional(),
              userId: Joi.string(),
              data: Joi.object(),
              creationDate: Joi.string(),
            },
          },
        },
      },
      handler: this.controller.remove.bind(this.controller),
    })

    return this.router.middleware()
  }
}
