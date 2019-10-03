import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
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
     *             examples:
     *               filter:
     *                 value: {
     *                   "email": "john.doe@email.com",
     *                   "password": "8GmJUyw5RZHH6JgS"
     *                 }
     *     responses:
     *       202:
     *         description: OK
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
     *       403:
     *         description: Forbidden
     *       404:
     *         description: Not found
     *       422:
     *         description: Unprocessable entity
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'post',
      path: '/',
      validate: { type: 'json' },
      handler: this.controller.request.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /tokens:
     *   delete:
     *     security:
     *       - cookieAuth: []
     *     tags:
     *       - Tokens
     *     summary: Clear token
     *     description: Clear up JWT within the cookies
     *     responses:
     *       205:
     *         description: Reset content
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden
     *       404:
     *         description: Not found
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'delete',
      path: '/',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, 'user'),
      ],
      handler: this.controller.clear.bind(this.controller),
    })

    return this.router.middleware()
  }
}
