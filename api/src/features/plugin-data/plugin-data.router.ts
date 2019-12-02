import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router } from 'koa-joi-router'
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
    this.router.use(
      bodyParser({
        enableTypes: ['text'],
        extendTypes: {
          text: ['application/javascript'],
        },
        textLimit: '500kb',
      })
    )

    /**
     * @swagger
     *
     * /plugin-data/{bundle}/{plugin}:
     *   put:
     *     tags:
     *       - Plugin Data
     *     parameters:
     *       - in: path
     *         name: bundle
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: plugin
     *         required: true
     *         schema:
     *           type: string
     *     summary: Set Data
     *     description: Set the plugin data for a specific plugin
     *     requestBody:
     *         content:
     *           application/javascript:
     *             schema:
     *               required:
     *               - plugin data
     *               properties:
     *                 plugin data:
     *                   type: string
     *             examples:
     *               filter:
     *                 value: function somePlugin(a,b){...}
     *     responses:
     *       200:
     *         description: OK
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'put',
      path: '/:bundle/:title',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['developer', 'admin']),
      ],
      handler: this.controller.set.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /plugin-data/{bundle}/{plugin}:
     *   get:
     *     tags:
     *       - Plugin Data
     *     parameters:
     *       - in: path
     *         name: bundle
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: plugin
     *         required: true
     *         schema:
     *           type: string
     *     summary: Get Data
     *     description: Get the plugin data from a specific plugin
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/javascript:
     *             schema:
     *               required:
     *               - plugin data
     *               properties:
     *                 plugin data:
     *                   type: string
     *             examples:
     *               filter:
     *                 value: function somePlugin(a,b){...}
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/:bundle/:title',
      handler: this.controller.get.bind(this.controller),
    })

    return this.router.middleware()
  }
}
