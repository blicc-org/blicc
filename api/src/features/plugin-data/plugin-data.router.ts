import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
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
      path: '/:bundle/:title',
      handler: this.controller.set.bind(this.controller),
    })

    this.router.route({
      method: 'get',
      path: '/:bundle/:title',
      handler: this.controller.get.bind(this.controller),
    })

    this.router.route({
      method: 'delete',
      path: '/:bundle/:title',
      handler: this.controller.flush.bind(this.controller),
    })

    return this.router.middleware()
  }
}
