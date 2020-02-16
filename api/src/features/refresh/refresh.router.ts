import { Middleware } from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { RefreshController } from './refresh.controller'

export class RefreshRouter {
  private prefix: string
  private router: Router
  private controller: RefreshController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new RefreshController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)
    this.router.use(bodyParser({ strict: true }))

    /**
     * @swagger
     *
     * /refresh:
     *   post:
     *     tags:
     *       - Refresh Token
     *     summary: Request new Token
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
     *                   - id
     *                   - refreshToken
     *                   properties:
     *                     id:
     *                       type: string
     *                     refreshToken:
     *                       type: string
     *                       description: Refresh token, required to retrieve new access token in case the old one expired.
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "5u89rA3d",
     *                   "refreshToken": "123e4567-e89b-12d3-a456-426655440000"
     *                 }
     *     responses:
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
     *                 refreshToken:
     *                   type: string
     *             examples:
     *               filter:
     *                 value: {
     *                   "id": "MRW2dSku",
     *                   "firstName": "John",
     *                   "lastName": "Doe",
     *                   "email": "john.doe@email.com",
     *                   "role": "user",
     *                   "hasTwoFactorAuth": "true",
     *                   "refreshToken": "123e4567-e89b-12d3-a456-426655440000",
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
          id: Joi.string().required(),
          refreshToken: Joi.string().required(),
        },
        output: {
          202: {
            body: {
              id: Joi.string().required(),
              firstName: Joi.string().required(),
              lastName: Joi.string().required(),
              email: Joi.string().required(),
              role: Joi.string().required(),
              hasTwoFactorAuth: Joi.boolean().required(),
              creationDate: Joi.string().required(),
              refreshToken: Joi.string().required(),
            },
          },
        },
      },
      handler: this.controller.refresh.bind(this.controller),
    })

    return this.router.middleware()
  }
}
