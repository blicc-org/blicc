import Koa from 'koa'
import status from 'http-status-codes'
import { UserService } from './user.service'
import { Email } from '../util/email'

export class UserController {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public async access(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()
    try {
      const { id } = ctx.params
      const user = await this.userService.selectById(id)
      if (user !== undefined) {
        ctx.body = user
        ctx.status = status.OK
        return
      }
    } catch (e) {
      ctx.status = status.INTERNAL_SERVER_ERROR
    }
  }

  public async register(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()

    const { firstName, lastName, email, password } = ctx.request.body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !Email.isValid(email)
    ) {
      ctx.status = status.UNPROCESSABLE_ENTITY
      return
    }

    if (await this.userService.exists(email)) {
      ctx.status = status.CONFLICT
      return
    }

    try {
      const { passwordHash, ...user } = await this.userService.register(
        firstName,
        lastName,
        email,
        password
      )
      if (user !== undefined) {
        ctx.status = status.CREATED
        ctx.body = user
        return
      }
    } catch (e) {
      ctx.status = status.INTERNAL_SERVER_ERROR
    }
  }
}
