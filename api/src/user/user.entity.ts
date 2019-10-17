import {
  Entity,
  PrimaryColumn,
  BeforeInsert,
  Column,
  BaseEntity,
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

  @Column()
  public email: string

  @Column({ select: false })
  public passwordHash: string

  @Column()
  public role: string

  @Column()
  public hasTwoFactorAuth: boolean

  @Column({ select: false })
  public twoFactorAuthSecret: string

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const userService = new UserService()
    this.id = await userService.generateId()
  }

  public constructor(
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    role: string,
    hasTwoFactorAuth: boolean,
    twoFactorAuthSecret: string
  ) {
    super()
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.passwordHash = passwordHash
    this.role = role
    this.hasTwoFactorAuth = hasTwoFactorAuth
    this.twoFactorAuthSecret = twoFactorAuthSecret
  }
}
