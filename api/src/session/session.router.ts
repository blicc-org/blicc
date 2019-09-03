import Router from 'koa-router'
import { SessionController } from './session.controller'

export class SessionRouter {
  private router: Router
  private controller: SessionController

  public constructor(prefix: string) {
    this.router = new Router({ prefix })
    this.controller = new SessionController()
  }

  public routes(): Router.IMiddleware {
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

    return this.router.routes()
  }
}
