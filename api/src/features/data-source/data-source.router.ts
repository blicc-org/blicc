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
