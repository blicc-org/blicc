import Koa from 'koa'
import status from 'http-status-codes'
import { UserService } from './user.service'
import { Email } from '../util/email'

export class UserController {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public async register(ctx: Koa.BaseContext, next: Function): Promise<void> {
    // dont check Koa Middleware for verification
    next()

    const { email, password } = ctx.request.body

    if (!email || !password || !Email.isValid(email)) {
      ctx.status = status.UNPROCESSABLE_ENTITY
      return
    }

    if (await this.userService.exists(email)) {
      ctx.status = status.CONFLICT
      return
    }

    try {
      const user = await this.userService.register(email, password)
      if (user !== undefined) {
        ctx.status = status.CREATED
        return
      }
    } catch (e) {
      ctx.status = status.INTERNAL_SERVER_ERROR
    }
  }
}
