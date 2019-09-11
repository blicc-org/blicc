import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { SessionController } from './session.controller'

export class SessionRouter {
  private prefix: string
  private router: Router
  private controller: SessionController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new SessionController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    /**
     * @swagger
     *
     * /sessions:
     *   post:
     *     tags:
     *       - Sessions
     *     summary: Open session
     *     description: Request JWT to authenticate a user during a session
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
    this.router.post('/', this.controller.login.bind(this.controller))

    /**
     * @swagger
     *
     * /sessions:
     *   delete:
     *     tags:
     *       - Sessions
     *     summary: Close session
     *     description: Reset the JWT in the cookies
     *     responses:
     *       205:
     *         description: Reset content
     */
    this.router.delete('/', this.controller.logout.bind(this.controller))

    return this.router.middleware()
  }
}
