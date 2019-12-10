import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router } from 'koa-joi-router'
import { BundleController } from './bundles.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

export class BundleRouter {
  private prefix: string
  private router: Router
  private controller: BundleController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new BundleController()
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
     * /bundles/{slug}
     *   put:
     *     tags:
     *       - Bundles
     *     parameters:
     *       - in: path
     *         name: slug
     *         required: true
     *         schema:
     *           type: string
     *     summary: Set Data
     *     description: Set the bundle data for a specific bundle
     *     requestBody:
     *         content:
     *           application/javascript:
     *             schema:
     *               required:
     *               - bundle data
     *               properties:
     *                 bundle data:
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
      path: '/:slug',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['developer', 'admin']),
      ],
      handler: this.controller.set.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /bundles/{slug}:
     *   get:
     *     tags:
     *       - Bundles
     *     parameters:
     *       - in: path
     *         name: slug
     *         required: true
     *         schema:
     *           type: string
     *     summary: Get Data
     *     description: Get the bundle data from a specific bundle
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/javascript:
     *             schema:
     *               required:
     *               - bundle data
     *               properties:
     *                 bundle data:
     *                   type: string
     *             examples:
     *               filter:
     *                 value: function somePlugin(a,b){...}
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/:slug',
      handler: this.controller.get.bind(this.controller),
    })

    return this.router.middleware()
  }
}
