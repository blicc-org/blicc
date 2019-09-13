import Koa from 'koa'
import status from 'http-status-codes'
import { UserService } from './user.service'
import { Validation } from '../util/validation'

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
      !Validation.isEmail(email)
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

  public async reset(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()

    const { email } = ctx.request.body

    if (!email || !(await this.userService.exists(email))) {
      ctx.status = status.NOT_FOUND
      return
    }

    try {
      const user = await this.userService.select(email)
      if (!user) {
        ctx.status = status.INTERNAL_SERVER_ERROR
        return
      }

      const { firstName, lastName } = user
      const info = await this.userService.requestPasswordReset(
        firstName,
        lastName,
        email
      )
      ctx.status = status.OK
      console.log(info)
    } catch (e) {
      console.log(e)
      ctx.status = status.INTERNAL_SERVER_ERROR
    }
  }
}
