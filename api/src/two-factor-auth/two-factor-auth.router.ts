import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { TwoFactorAuthController } from './two-factor-auth.controller'

export class TwoFactorAuthRouter {
  private prefix: string
  private router: Router
  private controller: TwoFactorAuthController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new TwoFactorAuthController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    this.router.prefix(this.prefix)
    /**
     * @swagger
     *
     * /two-factor-auth:
     *   post:
     *     tags:
     *       - Two-factor auth
     *     summary: Enable Two-factor auth
     *     description: Set secret on server side and enable two-factor auth for user
     *     produces:
     *       - application/json
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - secret
     *               properties:
     *                 secret:
     *                   type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "secret": "secret"
     *                 }
     *     responses:
     *       204:
     *         description: No content
     *       403:
     *         description: Forbidden
     *       404:
     *         description: Not found
     *       422:
     *         description: Unprocessable entity
     *       500:
     *         description: Internal Server Error response.
     */
    this.router.route({
      method: 'post',
      path: '/',
      validate: { type: 'json' },
      handler: this.controller.enable.bind(this.controller),
    })

    return this.router.middleware()
  }
}
