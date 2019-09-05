import Koa from 'koa'
import status from 'http-status-codes'
import { SessionService } from './session.service'
import { UserService } from '../user/user.service'
import { JWT } from '../util/jwt'
import { IS_PROD } from '../config'

export class SessionController {
  private sessionService: SessionService
  private userService: UserService

  public constructor() {
    this.sessionService = new SessionService()
    this.userService = new UserService()
  }

  public async login(ctx: Koa.BaseContext, next: Function): Promise<void> {
    await next()

    const { email, password } = ctx.request.body

    if (!email || !password) {
      ctx.status = status.UNPROCESSABLE_ENTITY
      return
    }

    const user = await this.userService.select(email)

    if (!user) {
      ctx.status = status.NOT_FOUND
      return
    }

    if (!(await this.sessionService.authenticate(email, password))) {
      ctx.status = status.FORBIDDEN
      return
    }

    const { token, session } = JWT.generate(email)
    const maxAge = (session.exp - session.iat) * 1000 // maxAge requires miliseconds
    ctx.cookies.set('access_token', token, {
      maxAge,
      secure: IS_PROD,
      httpOnly: IS_PROD,
    })

    ctx.status = status.ACCEPTED
    ctx.body = {
      jwt: token,
      user,
    }
  }
}
