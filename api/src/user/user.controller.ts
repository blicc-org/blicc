import Koa from 'koa'
import bcrypt from 'bcryptjs'
import { getRepository, Repository } from 'typeorm'
import { User } from './user.entity'

const PW = 'nais'

export class UserController {
  public async verify(ctx: Koa.BaseContext, next: Function): Promise<void> {
    // dont check Koa Middleware for verification
    next()

    const repo: Repository<User> = getRepository(User)
    repo.save({
      email: 'info@example.com',
      password: 'test',
      role: 'admin',
    })

    ctx.body = await repo.find()

    // var salt = bcrypt.genSaltSync(10)
    // var hash = bcrypt.hashSync(PW, salt)
    // ctx.body = hash
  }

  public async update(ctx: Koa.BaseContext, next: Function): Promise<void> {
    next()

    const hash = ctx.request.body.hash
    ctx.body = bcrypt.compareSync(PW, hash)
  }
}
