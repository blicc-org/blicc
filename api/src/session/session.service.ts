import { Repository, getRepository } from 'typeorm'
import { User } from '../user/user.entity'
import { Hash } from '../util/hash'

export class SessionService {
  private userRepo: Repository<User>

  public constructor() {
    this.userRepo = getRepository(User)
  }

  public async authenticate(email: string, password: string): Promise<boolean> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne()

    if (user === undefined) return false
    return Hash.authenticate(password, user.passwordHash)
  }
}
