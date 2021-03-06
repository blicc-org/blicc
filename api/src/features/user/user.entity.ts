import {
  Entity,
  PrimaryColumn,
  BeforeInsert,
  Column,
  BaseEntity,
  Index,
} from 'typeorm'
import { UserService } from './user.service'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  public id?: string

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Index('email-idx')
  @Column()
  public email: string

  @Column({ select: false })
  public passwordHash: string

  @Column({ select: false })
  public refreshToken: string

  @Column()
  public role: string

  @Column()
  public hasTwoFactorAuth: boolean

  @Column({ select: false })
  public twoFactorAuthSecret: string

  @Column()
  public creationDate?: string

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const userService = new UserService()
    this.id = await userService.generateId()
    this.creationDate = new Date().toISOString()
  }

  public constructor(
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    refreshToken: string,
    role: string,
    hasTwoFactorAuth: boolean,
    twoFactorAuthSecret: string
  ) {
    super()
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.passwordHash = passwordHash
    this.refreshToken = refreshToken
    this.role = role
    this.hasTwoFactorAuth = hasTwoFactorAuth
    this.twoFactorAuthSecret = twoFactorAuthSecret
  }
}
