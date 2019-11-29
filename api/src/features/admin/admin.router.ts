import { Middleware } from 'koa'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { AdminController } from './admin.controller'

export class AdminRouter {
  private prefix: string
  private router: Router
  private controller: AdminController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new AdminController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /admins:
     *   post:
     *     tags:
     *       - Admin
     *     summary: Initialize admin
     *     description: Initialize the root admin. Only one admin can be initialized over this route. The admin can grant admin rights to other users. The root admin can only be initialized when no other user is registered in the database yet.
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
     *                   "firstName": "Root",
     *                   "lastName": "Admin",
     *                   "email": "admin@email.com",
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
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "ojziCepXt",
     *                   "firstName": "Root",
     *                   "lastName": "Admin",
     *                   "email": "admin@email.com",
     *                   "password": "PJTjthaX2kSM8hvG",
     *                   "role": "admin",
     *                   "hasTwoFactorAuth": false
     *                 }
     *       400:
     *         description: Bad request
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
      handler: this.controller.initialize.bind(this.controller),
    })

    return this.router.middleware()
  }
}
