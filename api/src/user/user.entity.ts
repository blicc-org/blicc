import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id?: number

  @Column()
  public email: string

  @Column()
  public password: string

  @Column()
  public role: string

  public constructor(email: string, password: string, role: string = 'user') {
    super()
    this.email = email
    this.password = password
    this.role = role
  }
}
