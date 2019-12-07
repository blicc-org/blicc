import Koa from 'koa'
import statusCode from 'http-status-codes'
import { UserService } from './user.service'
import { Validation } from '../../util/validation'
import { TokenService } from '../token/token.service'

export class UserController {
  private userService: UserService
  private tokenService: TokenService

  public constructor() {
    this.userService = new UserService()
    this.tokenService = new TokenService()
  }

  public async register(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    await next()

    const { firstName, lastName, email, password } = ctx.request.body

    if (
      !Validation.isName(firstName) ||
      !Validation.isName(lastName) ||
      !Validation.isEmail(email) ||
      !Validation.isPassword(password)
    ) {
      ctx.status = statusCode.UNPROCESSABLE_ENTITY
      return
    }

    try {
      const user = await this.userService.register(
        firstName,
        lastName,
        email,
        password
      )
      if (!user) {
        ctx.status = statusCode.CONFLICT
        return
      } else {
        ctx.status = statusCode.CREATED
        ctx.body = user
        return
      }
    } catch (e) {
      ctx.status = statusCode.INTERNAL_SERVER_ERROR
    }
  }

  public async access(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    try {
      const { id } = ctx.params
      const user = await this.userService.selectById(id)
      if (user !== undefined && ctx.user.id === id) {
        ctx.body = user
        ctx.status = statusCode.OK
        return
      }
      ctx.status = statusCode.FORBIDDEN
    } catch (e) {
      ctx.status = statusCode.INTERNAL_SERVER_ERROR
    }
  }

  public async list(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.status = statusCode.OK
    const users = await this.userService.list()
    const total = await this.userService.getTotalEntries()
    ctx.body = {
      total,
      users,
    }
  }

  public async delete(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    try {
      const { id } = ctx.params
      const { password, token = '' } = ctx.request.body

      if (
        await this.tokenService.authenticate(
          ctx.user.email,
          password,
          ctx.user.hasTwoFactorAuth,
          token
        )
      ) {
        if (await this.userService.deleteById(id)) {
          ctx.status = statusCode.OK
          delete ctx.user.id
          ctx.body = ctx.user
        } else throw Error('An error occured while requesting a deletion.')
      }
    } catch (e) {
      ctx.status = statusCode.INTERNAL_SERVER_ERROR
    }
  }
}
