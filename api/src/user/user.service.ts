import { Repository, getRepository } from 'typeorm'
import { User } from './user.entity'

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
    const user = new User(email, password, role)
    return await this.repo.save(user)
  }

  public async exists(email: string): Promise<boolean> {
    return (await this.repo.findOne({ email })) !== undefined
  }

  public async authenticate(email: string, password: string): Promise<boolean> {
    return (await this.repo.findOne({ email, password })) !== undefined
  }
}
