import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { TokenController as TokenController } from './token.controller'

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
     *         description: Accepted
     *         content:
     *           JWT:
     *             schema:
     *               required:
     *               - jwt
     *               properties:
     *                 jwt:
     *                   type: json web token
     *                   description: A JWT will be stored in the cookies for authentication
     *             examples:
     *               filter:
     *                 value: {
     *                   "header": {
     *                     "alg": "RS256",
     *                     "typ": "JWT"
     *                   },
     *                   "payload": {
     *                     "iat": 1567539096,
     *                     "exp": 1567711896,
     *                     "email": "john.doe@email.com",
     *                   },
     *                   "signature": "RSASHA256"
     *                 }
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
      handler: this.controller.login.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /tokens:
     *   delete:
     *     tags:
     *       - Tokens
     *     summary: Clear token
     *     description: Reset the JWT in the cookies
     *     responses:
     *       205:
     *         description: Reset content
     */
    this.router.route({
      method: 'delete',
      path: '/',
      handler: this.controller.logout.bind(this.controller),
    })

    return this.router.middleware()
  }
}
