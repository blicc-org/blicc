import { Repository, getRepository } from 'typeorm'
import { UserEntity } from '../user/user.entity'

export class AdminService {
  private repo: Repository<UserEntity>

  public constructor() {
    this.repo = getRepository(UserEntity)
  }

  public async isInitializeAdminAllowed(): Promise<boolean> {
    let users = []
    try {
      users = await this.repo.find({
        skip: 0,
        take: 1,
        cache: false,
      })
      return users.length === 0
    } catch (e) {
      return false
    }
  }
}
