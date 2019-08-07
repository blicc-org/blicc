import Koa from 'koa'
import status from 'http-status-codes'
import { SessionService } from './session.service'
import { UserService } from '../user/user.service'

export class SessionController {
  private sessionService: SessionService
  private userService: UserService

  public constructor() {
    this.sessionService = new SessionService()
    this.userService = new UserService()
  }

  public async login(ctx: Koa.BaseContext, next: Function): Promise<void> {
    // dont check Koa Middleware for verification
    next()

    const { email, password } = ctx.request.body

    if (!email || !password) {
      ctx.body = status.UNPROCESSABLE_ENTITY
      return
    }

    if (!(await this.userService.exists(email))) {
      ctx.body = status.NOT_FOUND
      return
    }

    if (!(await this.sessionService.authenticate(email, password))) {
      ctx.body = status.FORBIDDEN
      return
    }

    ctx.body = status.ACCEPTED
  }
}
