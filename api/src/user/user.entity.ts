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
  public email: string

  @Column()
  public passwordHash: string

  @Column()
  public role: string

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const userService = new UserService()
    this.id = await userService.generateId()
  }

  public constructor(email: string, passwordHash: string, role: string) {
    super()
    this.email = email
    this.passwordHash = passwordHash
    this.role = role
  }
}
