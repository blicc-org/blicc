import { Middleware } from 'koa'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { PluginDataController } from './plugin-data.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

export class PluginDataRouter {
  private prefix: string
  private router: Router
  private controller: PluginDataController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new PluginDataController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    this.router.route({
      method: 'post',
      path: '/:bundle/:title',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['developer', 'admin']),
      ],
      handler: this.controller.set.bind(this.controller),
    })

    this.router.route({
      method: 'get',
      path: '/:bundle/:title',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      handler: this.controller.get.bind(this.controller),
    })

    return this.router.middleware()
  }
}
