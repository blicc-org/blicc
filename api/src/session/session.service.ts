import { Repository, getRepository } from 'typeorm'
import { User } from '../user/user.entity'

export class SessionService {
  private userRepo: Repository<User>

  public constructor() {
    this.userRepo = getRepository(User)
  }

  public async authenticate(email: string, password: string): Promise<boolean> {
    return (await this.userRepo.findOne({ email, password })) !== undefined
  }
}
