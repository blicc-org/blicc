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

    this.router.use(
      AuthMiddleware.handle,
      PermissionMiddleware.handle.bind(null, ['user', 'admin'])
    )

    this.router.route({
      method: 'post',
      path: '/',
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

    this.router.route({
      method: 'get',
      path: '/',
      handler: this.controller.list.bind(this.controller),
    })

    return this.router.middleware()
  }
}
