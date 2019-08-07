import Koa from 'koa'
import status from 'http-status-codes'
import { UserService } from './user.service'
import { EmailUtil } from '../common/email.util'

export class UserController {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public async create(ctx: Koa.BaseContext, next: Function): Promise<void> {
    // dont check Koa Middleware for verification
    next()

    const { email, password } = ctx.request.body

    if (!email || !password || !EmailUtil.isValid(email)) {
      ctx.body = status.UNPROCESSABLE_ENTITY
      return
    }

    if (await this.userService.exists(email)) {
      ctx.body = status.CONFLICT
      return
    }

    try {
      const user = await this.userService.register(email, password)
      if (user !== undefined) {
        ctx.body = status.CREATED
        return
      }
    } catch (e) {
      ctx.body = status.INTERNAL_SERVER_ERROR
    }
  }
}
