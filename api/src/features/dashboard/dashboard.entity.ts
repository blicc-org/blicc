import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm'
import { DashboardService } from './dashboard.service'

@Entity()
export class DashboardEntity extends BaseEntity {
  @PrimaryColumn()
  public id?: string

  @Column()
  public title: string

  @Column()
  public userId: string

  @Column({ type: 'json' })
  public data: object

  @Column()
  public creationDate?: string

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const dashboardService = new DashboardService()
    this.id = await dashboardService.generateId()
    this.creationDate = new Date().toISOString()
  }

  public constructor(title: string, userId: string, data: object) {
    super()
    this.title = title
    this.userId = userId
    this.data = data
  }
}
