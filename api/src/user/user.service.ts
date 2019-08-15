import { Repository, getRepository } from 'typeorm'
import { User } from './user.entity'
import { Hash } from '../common/hash.util'

export class UserService {
  private repo: Repository<User>

  public constructor() {
    this.repo = getRepository(User)
  }

  public async register(
    email: string,
    password: string,
    role: string = 'user'
  ): Promise<User> {
    const passwordHash = Hash.generate(password)
    const user = new User(email, passwordHash, role)
    return await this.repo.save(user)
  }

  public async exists(email: string): Promise<boolean> {
    return (await this.repo.findOne({ email })) !== undefined
  }
}
