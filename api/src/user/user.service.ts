import { Repository, getRepository } from 'typeorm'
import { User } from './user.entity'
import { Hash } from '../util/hash'
import { MailDistributor } from '../util/mail-distributor'
import { SentMessageInfo } from 'nodemailer'
import shortid from 'shortid'

export class UserService {
  private repo: Repository<User>

  public constructor() {
    this.repo = getRepository(User)
  }

  public async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role = 'user'
  ): Promise<User> {
    const passwordHash = Hash.generate(password)
    const user = new User(firstName, lastName, email, passwordHash, role)
    return await this.repo.save(user)
  }

  public async exists(email: string): Promise<boolean> {
    return (await this.repo.findOne({ email })) !== undefined
  }

  public async select(email: string): Promise<User | undefined> {
    return await this.repo.findOne({ email })
  }

  public async selectById(id: string): Promise<User | undefined> {
    let response
    try {
      response = await this.repo.findOne(id)
    } catch (e) {
      throw Error(e)
    }
    return response
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }

  public async requestPasswordReset(
    firstName: string,
    lastName: string,
    email: string
  ): Promise<SentMessageInfo> {
    return await MailDistributor.getInstance().send(
      email,
      'Reset Password',
      `Hello ${firstName} ${lastName}, reset your password by clicking the following link!`
    )
  }
}
