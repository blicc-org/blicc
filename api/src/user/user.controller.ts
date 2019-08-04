import Koa from 'koa'
import bcrypt from 'bcryptjs'
import { getRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import statusCodes from 'http-status-codes'

const PW = 'nais'

export class UserController {
  public async login(ctx: Koa.BaseContext, next: Function): Promise<void> {
    // dont check Koa Middleware for verification
    next()

    const body = ctx.request.body

    if (body.email && body.password) {
      const repo = getRepository(User)
      const user = await repo.findOne({
        email: body.email,
        password: body.password,
      })

      if (user) {
        ctx.body = statusCodes.OK
      } else {
        ctx.body = statusCodes.FORBIDDEN
      }
    } else {
      ctx.body = statusCodes.BAD_REQUEST
    }

    const repo: Repository<User> = getRepository(User)
    repo.save({
      email: 'info@example.com',
      password: 'test',
      role: 'admin',
    })

    ctx.body = await repo.find()
  }

  public async register(ctx: Koa.BaseContext, next: Function): Promise<void> {
    // dont check Koa Middleware for verification
    next()

    const body = ctx.request.body

    if (body.email && body.password) {
      const user = new User(body.emal, body.password, 'admin')
      const repo = getRepository(User)
      repo.save(user)
      ctx.body = statusCodes.CREATED
    } else {
      ctx.body = statusCodes.BAD_REQUEST
    }
  }

  // var salt = bcrypt.genSaltSync(10)
  // var hash = bcrypt.hashSync(PW, salt)
  // ctx.body = hash

  // const hash = ctx.request.body.hash
  // ctx.body = bcrypt.compareSync(PW, hash)
}
