import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  BeforeInsert,
  Index,
} from 'typeorm'
import { DashboardService } from './dashboard.service'

type Data = any

@Entity()
export class DashboardEntity extends BaseEntity {
  @PrimaryColumn()
  public id?: string

  @Index('dashboard-title-idx')
  @Column()
  public title: string

  @Column({ type: 'text' })
  public description: string

  @Column()
  public userId: string

  @Column({ type: 'json' })
  public data: Data

  @Column()
  public creationDate?: string

  @Column({ default: 'private' })
  public visibility?: string

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const dashboardService = new DashboardService()
    this.id = await dashboardService.generateId()
    this.creationDate = new Date().toISOString()
  }

  public constructor(
    title: string,
    description: string,
    userId: string,
    data: Data
  ) {
    super()
    this.title = title
    this.description = description
    this.userId = userId
    this.data = data
  }
}
