import { Middleware } from 'koa'
import createRouter, { Router, Joi } from 'koa-joi-router'
import { ThumbnailController } from './thumbnail.controller'
import { AuthMiddleware, PermissionMiddleware } from '../../common/middleware'

export class ThumbnailRouter {
  private prefix: string
  private router: Router
  private controller: ThumbnailController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new ThumbnailController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /dashboard-thumbnails/{id}.jpg:
     *   get:
     *     security:
     *       - cookieAuth: []
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     produces:
     *       - image/jpeg
     *     tags:
     *       - Thumbnails
     *     parameters:
     *       - in: query
     *         name: resolution
     *         schema:
     *           type: string
     *         description: Set one of the two provided resolutions 640x360 and 1280x720 like 2Dc41Hqd.jpg?resolution=1280x720. The 640x360 resolution is default.
     *     summary: Get dashboard thumbnails
     *     description: Get a thumbnail of a given dashboard id as a jpeg name.
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           image/*:
     *             schema:
     *               type: string
     *               format: binary
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/dashboard-thumbnails/:imgName',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      validate: {
        output: {
          200: {
            body: Joi.binary(),
          },
        },
      },
      handler: this.controller.serve.bind(this.controller),
    })

    return this.router.middleware()
  }
}
