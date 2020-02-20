import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
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
    this.router.use(bodyParser({ strict: true }))

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
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "ojziCepXt",
     *                   "firstName": "John",
     *                   "lastName": "Doe",
     *                   "email": "john.doe@email.com",
     *                   "role": "user",
     *                   "hasTwoFactorAuth": false,
     *                   "creationDate": "2019-11-02T15:45:58.284Z"
     *                 }
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
     *                   - creationDate
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
     *                     creationDate:
     *                       type string
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "ojziCepXt",
     *                   "firstName": "John",
     *                   "lastName": "Doe",
     *                   "email": "john.doe@email.com",
     *                   "role": "user",
     *                   "hasTwoFactorAuth": true,
     *                   "creationDate": "2019-11-02T15:45:58.284Z"
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
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
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
     *   get:
     *     security:
     *       - cookieAuth: []
     *     tags:
     *       - User
     *     summary: List all users
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     description: List all users with their given details. You have to be an administrator to be able to access this route.
     *     parameters:
     *       - in: query
     *         name: fields
     *         schema:
     *           type: array
     *         style: form
     *         explode: false
     *         description: Concatenate field names you want to receive like this ?fields=id,firstName,lastName,creationDate . If you do not provide the field query you get all fields.
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Select users where the email matches the given search term like ?search=contact@user.com
     *       - in: query
     *         name: skip
     *         schema:
     *           type: number
     *         description: Defines the offset of the requested users.
     *       - in: query
     *         name: take
     *         schema:
     *           type: number
     *         description: Defines the amount of the requested users.
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
     *                 total:
     *                   type: number
     *                 users:
     *                   type: object
     *                   properties:
     *                     user:
     *                       type: object
     *                       required:
     *                       - id
     *                       - firstName
     *                       - lastName
     *                       - email
     *                       - role
     *                       - hasTwoFactorAuth
     *                       - creationDate
     *                       properties:
     *                         id:
     *                           type: string
     *                         firstName:
     *                           type: string
     *                         lastName:
     *                           type: string
     *                         email:
     *                           type: string
     *                         role:
     *                           type: string
     *                         hasTwoFactorAuth:
     *                           type: boolean
     *                         creationDate:
     *                           type string
     *             examples:
     *               filter:
     *                 value: {
     *                   total: 2,
     *                   users: [
     *                     {
     *                       "id": "ojziCepXt",
     *                       "firstName": "John",
     *                       "lastName": "Doe",
     *                       "email": "john.doe@email.com",
     *                       "role": "user",
     *                       "hasTwoFactorAuth": true,
     *                       "creationDate": "2019-11-02T15:45:58.284Z"
     *                     },
     *                     {
     *                       "id": "ojziCepXt",
     *                       "firstName": "George",
     *                       "lastName": "Donalds",
     *                       "email": "george.donalds@email.com",
     *                       "role": "developer",
     *                       "hasTwoFactorAuth": true,
     *                       "creationDate": "2019-12-04T15:45:58.284Z"
     *                     },
     *                   ]
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
      path: '/',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['admin']),
      ],
      validate: {
        output: {
          200: {
            body: {
              total: Joi.number().required(),
              users: Joi.array().items({
                id: Joi.string(),
                firstName: Joi.string(),
                lastName: Joi.string(),
                email: Joi.string(),
                role: Joi.string(),
                hasTwoFactorAuth: Joi.boolean(),
                creationDate: Joi.string(),
              }),
            },
          },
        },
      },
      handler: this.controller.list.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /users/{id}:
     *   put:
     *     tags:
     *       - User
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *     summary: Update user
     *     description: Update a user
     *     requestBody:
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
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "ojziCepXt",
     *                   "firstName": "New",
     *                   "lastName": "Name",
     *                   "email": "new@email.com",
     *                   "role": "user",
     *                   "hasTwoFactorAuth": false,
     *                   "creationDate": "2019-11-02T15:45:58.284Z"
     *                 }
     *     responses:
     *       200:
     *         description: OK
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
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "ojziCepXt",
     *                   "firstName": "New",
     *                   "lastName": "Name",
     *                   "email": "new@email.com",
     *                   "role": "user",
     *                   "hasTwoFactorAuth": false,
     *                   "creationDate": "2019-11-02T15:45:58.284Z"
     *                 }
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'put',
      path: '/:id',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          id: Joi.string().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().required(),
          role: Joi.string().required(),
          hasTwoFactorAuth: Joi.boolean().required(),
          creationDate: Joi.string().required(),
        },
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
      handler: this.controller.update.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /users/{userId}/delete:
     *   post:
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
     *     summary: Delete user
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     description: Delete user from database. In case two factor auth was enabled, it is mandatory to also pass the two factor auth token to delete the user. This action can not be revoked.
     *     produces:
     *       - application/json
     *     requestBody:
     *         content:
     *           application/json:
     *             schema:
     *               required:
     *               - password
     *               properties:
     *                 token:
     *                   type: string
     *                 password:
     *                   type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "token": "324534",
     *                   "password": "PJTjthaX2kSM8hvG"
     *                 }
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
     *                   - firstName
     *                   - lastName
     *                   - email
     *                   - role
     *                   - hasTwoFactorAuth
     *                   - creationDate
     *                   properties:
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
     *                     creationDate:
     *                       type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "firstName": "John",
     *                   "lastName": "Doe",
     *                   "email": "john.doe@email.com",
     *                   "role": "user",
     *                   "hasTwoFactorAuth": false,
     *                   "creationDate": "2019-11-02T15:45:58.284Z"
     *                 }
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'post',
      path: '/:id/delete',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        type: 'json',
        body: {
          token: Joi.string()
            .allow('')
            .optional(),
          password: Joi.string().required(),
        },
        output: {
          200: {
            body: {
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
      handler: this.controller.delete.bind(this.controller),
    })

    return this.router.middleware()
  }
}
