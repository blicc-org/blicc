import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id?: number

  @Column()
  public email: string

  @Column()
  public passwordHash: string

  @Column()
  public role: string

  public constructor(email: string, passwordHash: string, role: string) {
    super()
    this.email = email
    this.passwordHash = passwordHash
    this.role = role
  }
}
