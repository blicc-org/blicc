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

    this.router.route({
      method: 'put',
      path: '/:userId',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
        FormParserMiddleware.handle,
      ],
      handler: this.controller.serve.bind(this.controller),
    })

    return this.router.middleware()
  }
}
