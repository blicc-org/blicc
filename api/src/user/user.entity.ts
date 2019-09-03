import {
  Entity,
  PrimaryColumn,
  BeforeInsert,
  Column,
  BaseEntity,
} from 'typeorm'
import { UserService } from './user.service'

@Entity()
export class User extends BaseEntity {
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
    role: string
  ) {
    super()
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.passwordHash = passwordHash
    this.role = role
  }
}
