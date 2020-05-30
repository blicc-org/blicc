import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  BeforeInsert,
  Index,
} from 'typeorm'
import { DataSourceService } from './data-source.service'

@Entity()
export class DataSourceEntity extends BaseEntity {
  @PrimaryColumn()
  public id?: string

  @Index('data-source-title-idx')
  @Column()
  public title: string

  @Column({ type: 'text' })
  public description: string

  @Column()
  public userId: string

  @Column({ type: 'json' })
  public data: any

  @Column()
  public creationDate?: string

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const dataSourceEntity = new DataSourceService()
    this.id = await dataSourceEntity.generateId()
    this.creationDate = new Date().toISOString()
  }

  public constructor(
    title: string,
    description: string,
    userId: string,
    data: any
  ) {
    super()
    this.title = title
    this.description = description
    this.userId = userId
    this.data = data
  }
}
