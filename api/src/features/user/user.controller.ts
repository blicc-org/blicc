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
        if (user.id) await this.userService.createExamples(user.id)
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
      if (user && ctx.state.jwt.userId === id) {
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

    const fields = Validation.escapeFields(ctx.query.fields, [
      'id',
      'firstName',
      'lastName',
      'email',
      'creationDate',
      'role',
      'hasTwoFactorAuth',
    ])
    const searchTerm = Validation.escapeSearchQuery(ctx.query.search)
    const skip = Validation.escapeQueryNumber(ctx.query.skip)
    const take = Validation.escapeQueryNumber(ctx.query.take)

    ctx.status = statusCode.OK
    const users = await this.userService.list(fields, searchTerm, skip, take)
    const total = await this.userService.getTotalEntries()
    ctx.body = {
      total,
      users,
    }
  }

  public async update(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    const { id } = ctx.params
    const user = await this.userService.selectById(id)
    if (user && ctx.state.jwt.userId === user.id) {
      if (
        ctx.request.body.id === user.id &&
        ctx.request.body.role === user.role &&
        ctx.request.body.creationDate === user.creationDate
      ) {
        ctx.body = await this.userService.update(ctx.request.body)
        ctx.status = statusCode.OK
        return
      }
      ctx.status = statusCode.BAD_REQUEST
      return
    }
    ctx.status = statusCode.FORBIDDEN
  }

  public async delete(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    try {
      const { id } = ctx.params
      const { password, token = '' } = ctx.request.body
      const user = await this.userService.selectById(id)

      if (user && ctx.state.jwt.userId === id) {
        if (
          await this.tokenService.authenticate(
            user.email,
            password,
            user.hasTwoFactorAuth,
            token
          )
        ) {
          if (await this.userService.deleteById(id)) {
            ctx.status = statusCode.OK
            delete user.id
            ctx.body = user
            return
          } else throw Error('An error occured while requesting a deletion.')
        }
      }
      ctx.status = statusCode.FORBIDDEN
    } catch (e) {
      ctx.status = statusCode.INTERNAL_SERVER_ERROR
    }
  }
}
