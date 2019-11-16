import { Middleware } from 'koa'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { UserController } from './user.controller'
import { AuthMiddleware } from '../../common/middleware/auth-middleware'
import { PermissionMiddleware } from '../../common/middleware/permission-middleware'

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
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
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
     *                   - hasTwoFactorAuth
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
     *                     hasTwoFactorAuth:
     *                       type: boolean
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
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              id: Joi.string().required(),
              firstName: Joi.string().required(),
              lastName: Joi.string().required(),
              email: Joi.string().required(),
              role: Joi.string().required(),
              hasTwoFactorAuth: Joi.boolean().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
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
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 user:
     *                   type: object
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
     *                     hasTwoFactorAuth:
     *                       type: boolean
     *       400:
     *         description: Bad request
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
      validate: {
        type: 'json',
        body: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        },
        output: {
          201: {
            body: {
              id: Joi.string().required(),
              firstName: Joi.string().required(),
              lastName: Joi.string().required(),
              email: Joi.string().required(),
              role: Joi.string().required(),
              hasTwoFactorAuth: Joi.boolean().required(),
              creationDate: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.register.bind(this.controller),
    })

    return this.router.middleware()
  }
}
