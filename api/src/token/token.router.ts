import { Middleware } from 'koa'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { TokenController } from './token.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

export class TokenRouter {
  private prefix: string
  private router: Router
  private controller: TokenController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new TokenController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    /**
     * @swagger
     *
     * /tokens:
     *   post:
     *     tags:
     *       - Tokens
     *     summary: Request token
     *     description: Request JWT to authenticate a user
     *     produces:
     *       - application/json
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - credentials
     *               properties:
     *                 credentials:
     *                   type: object
     *                   required:
     *                   - email
     *                   - password
     *                   properties:
     *                     email:
     *                       type: string
     *                     password:
     *                       type: string
     *                     token:
     *                       type: string
     *                       description: Authorization token, required if the two-factor authorization is enabled.
     *             examples:
     *               filter:
     *                 value: {
     *                   "email": "john.doe@email.com",
     *                   "password": "8GmJUyw5RZHH6JgS",
     *                   "token": "234908"
     *                 }
     *     responses:
     *       200:
     *         description: Two-factor authorization is required
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 hasTwoFactorAuth:
     *                   type: boolean
     *                   description:
     *             examples:
     *               filter:
     *                 value: {
     *                   "hasTwoFactorAuth": "true"
     *                 }
     *       202:
     *         description: Accepted
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 id:
     *                   type: string
     *                 firstName:
     *                   type: string
     *                 lastName:
     *                   type: string
     *                 email:
     *                   type: string
     *                 role:
     *                   type: string
     *                 hasTwoFactorAuth:
     *                   type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "MRW2dSku",
     *                   "firstName": "John",
     *                   "lastName": "Doe",
     *                   "email": "john.doe@email.com",
     *                   "role": "user",
     *                   "hasTwoFactorAuth": "true"
     *                 }
     *       400:
     *         description: Bad request
     *       403:
     *         description: Forbidden
     *       404:
     *         description: Not found
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'post',
      path: '/',
      validate: {
        type: 'json',
        body: {
          email: Joi.string().required(),
          password: Joi.string().required(),
          token: Joi.string(),
        },
        output: {
          200: {
            body: {
              hasTwoFactorAuth: Joi.boolean().required(),
            },
          },
          202: {
            body: {
              id: Joi.string().required(),
              firstName: Joi.string().required(),
              lastName: Joi.string().required(),
              email: Joi.string().required(),
              role: Joi.string().required(),
              hasTwoFactorAuth: Joi.boolean().required(),
            },
          },
        },
      },
      handler: this.controller.request.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /tokens:
     *   delete:
     *     tags:
     *       - Tokens
     *     summary: Clear token
     *     description: Clear up JWT within the cookies
     *     responses:
     *       205:
     *         description: Reset content
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'delete',
      path: '/',
      handler: this.controller.clear.bind(this.controller),
    })

    return this.router.middleware()
  }
}
