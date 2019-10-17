import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { UserController } from './user.controller'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { PermissionMiddleware } from '../middleware/permission-middleware'

export class UserRouter {
  private prefix: string
  private router: Router
  private controller: UserController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new UserController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /users/{userId}:
     *   get:
     *     security:
     *       - cookieAuth: []
     *     tags:
     *       - User
     *     summary: Retrieve user details
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     description: Retrieve details of a specific user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - user
     *               properties:
     *                 user:
     *                   type: object
     *                   required:
     *                   - id
     *                   - firstName
     *                   - lastName
     *                   - email
     *                   - role
     *                   properties:
     *                     id:
     *                       type: string
     *                     firstName:
     *                       type: string
     *                     lastName:
     *                       type: string
     *                     email:
     *                       type: string
     *                     role:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "ojziCepXt",
     *                   "firstName": "John",
     *                   "lastName": "Doe",
     *                   "email": "john.doe@email.com",
     *                   "role": "user"
     *                 }
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
      method: 'get',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, 'user'),
      ],
      handler: this.controller.access.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /users:
     *   post:
     *     tags:
     *       - User
     *     summary: Register user
     *     description: Register a user
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - user
     *               properties:
     *                 user:
     *                   type: object
     *                   required:
     *                   - firstName
     *                   - lastName
     *                   - email
     *                   - password
     *                   properties:
     *                     firstName:
     *                       type: string
     *                     lastName:
     *                       type: string
     *                     email:
     *                       type: string
     *                     password:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "firstName": "John",
     *                   "lastName": "Doe",
     *                   "email": "john.doe@email.com",
     *                   "password": "PJTjthaX2kSM8hvG"
     *                 }
     *     responses:
     *       201:
     *         description: Created
     *       409:
     *         description: Conflict
     *       422:
     *         description: Unprocessable entity
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'post',
      path: '/',
      validate: { type: 'json' },
      handler: this.controller.register.bind(this.controller),
    })

    return this.router.middleware()
  }
}
