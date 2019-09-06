import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string

  @Column()
  public name: string

  public constructor(name: string) {
    super()
    this.name = name
  }
}
