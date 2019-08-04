import Koa from 'koa'
import bcrypt from 'bcryptjs'

const PW = 'nais'

export class UserController {
  public async verify(ctx: Koa.BaseContext, next: Function): Promise<void> {
    // dont check Koa Middleware for verification
    next()

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(PW, salt)
    ctx.body = hash
  }

  public async update(ctx: Koa.BaseContext, next: Function): Promise<void> {
    next()

    const hash = ctx.request.body.hash
    ctx.body = bcrypt.compareSync(PW, hash)
  }
}
