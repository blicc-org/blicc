import Koa from 'koa'
import bcrypt from 'bcryptjs'
import { getRepository } from 'typeorm'
import { User } from './user.entity'
import status from 'http-status-codes'
import { UserService } from './user.service'
import { EmailUtil } from '../common/email.util'

const PW = 'nais'

export class UserController {
  private userService: UserService

  public constructor() {
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

    if (!(await this.userService.authenticate(email, password))) {
      ctx.body = status.FORBIDDEN
      return
    }

    ctx.body = status.ACCEPTED
  }

  public async register(ctx: Koa.BaseContext, next: Function): Promise<void> {
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
