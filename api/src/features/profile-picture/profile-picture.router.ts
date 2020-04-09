import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { ProfilePictureController } from './profile-picture.controller'
import {
  AuthMiddleware,
  FormParserMiddleware,
  PermissionMiddleware,
} from '../../common/middleware'

export class ProfilePictureRouter {
  private prefix: string
  private router: Router
  private controller: ProfilePictureController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new ProfilePictureController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /profile-pictures/{userId}.jpg:
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
     *       - Profile pictures
     *     parameters:
     *       - in: query
     *         name: resolution
     *         schema:
     *           type: string
     *         description: Set one of the two provided resolutions 640x640 and 160x160 like 2Dc41Hqd.jpg?resolution=160x160. The 640x640 resolution is default.
     *     summary: Get profile picture
     *     description: Get a profile pictures of a given user id as jpeg name.
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
     *       403:
     *         description: Forbidden
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/:imgName',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      handler: this.controller.serve.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /profile-pictures/{userId}:
     *   put:
     *     security:
     *       - cookieAuth: []
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     summary: Update profile picture
     *     description: Update a profile picture by the given userId
     *     tags:
     *       - Profile pictures
     *     requestBody:
     *         content:
     *           image/*:
     *             schema:
     *               type: string
     *               format: binary
     *     responses:
     *       200:
     *         description: OK
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
      path: '/:userId',
      pre: [
        FormParserMiddleware.handle,
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      handler: this.controller.set.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /profile-pictures/{userId}:
     *   delete:
     *     security:
     *       - cookieAuth: []
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     summary: Delete profile picture
     *     description: Delete a profile picture by the given userId
     *     tags:
     *       - Profile pictures
     *     responses:
     *       200:
     *         description: OK
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
      method: 'delete',
      path: '/:userId',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      handler: this.controller.remove.bind(this.controller),
    })

    return this.router.middleware()
  }
}
