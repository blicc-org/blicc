import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { TwoFactorAuthController } from './two-factor-auth.controller'
import { AuthMiddleware, PermissionMiddleware } from '../../common/middleware'

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
    this.router.use(bodyParser({ strict: true }))

    /**
     * @swagger
     *
     * /two-factor-auth:
     *   get:
     *     security:
     *       - cookieAuth: []
     *     tags:
     *       - Two-Factor Auth
     *     summary: Request secret key
     *     description: Request a secret key in the form of a QR code to be able to do the two-factor challange.
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - otpAuthUrl
     *               properties:
     *                 otpAuthUrl:
     *                   type: string
     *                   required:
     *                   - otpAuthUrl
     *             examples:
     *               filter:
     *                 value: {
     *                   "otpAuthUrl": "otpauth://secret"
     *                 }
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden
     *       404:
     *         description: Not found
     *       409:
     *         description: Conflict
     *       500:
     *         description: Internal server error
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
              otpAuthUrl: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.request.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /two-factor-auth:
     *   post:
     *     security:
     *       - cookieAuth: []
     *     tags:
     *       - Two-Factor Auth
     *     summary: Enable two-factor auth
     *     description: Verify the token challange via a two-factor application like Authy on a separate device to enable two-factor auth for the requesting user.
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - token
     *               properties:
     *                 token:
     *                   type: string
     *                   required:
     *                   - token
     *             examples:
     *               filter:
     *                 value: {
     *                   "token": "123456"
     *                 }
     *     responses:
     *       204:
     *         description: No content
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
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
          token: Joi.string().required(),
        },
      },
      handler: this.controller.enable.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /two-factor-auth/delete:
     *   post:
     *     security:
     *       - cookieAuth: []
     *     tags:
     *       - Two-Factor Auth
     *     summary: Disable two-factor auth
     *     description: Disable two-factor Authentication.
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - token
     *               properties:
     *                 token:
     *                   type: string
     *                   required:
     *                   - token
     *             examples:
     *               filter:
     *                 value: {
     *                   "token": "123456"
     *                 }
     *     responses:
     *       204:
     *         description: No content
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    this.router.route({
      method: 'post',
      path: '/delete',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          token: Joi.string().required(),
        },
      },
      handler: this.controller.disable.bind(this.controller),
    })

    return this.router.middleware()
  }
}
