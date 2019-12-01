import { Middleware } from 'koa'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { PluginDataController } from './plugin-data.controller'

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
      path: '/:slug',
      handler: this.controller.set.bind(this.controller),
    })

    return this.router.middleware()
  }
}
