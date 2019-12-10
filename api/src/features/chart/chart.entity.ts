import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm'
import { ChartService } from './chart.service'

@Entity()
export class ChartEntity extends BaseEntity {
  @PrimaryColumn()
  public id?: string

  @Column()
  public title: string

  @Column()
  public bundle: string

  @Column({ type: 'text' })
  public description: string

  @Column()
  public userId: string

  @Column()
  public key: string

  @Column()
  public slug: string

  @Column()
  public creationDate?: string

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    const chartService = new ChartService()
    this.id = await chartService.generateId()
    this.creationDate = new Date().toISOString()
  }

  public constructor(
    title: string,
    bundle: string,
    description: string,
    userId: string,
    key: string,
    slug: string
  ) {
    super()
    this.title = title
    this.bundle = bundle
    this.description = description
    this.userId = userId
    this.key = key
    this.slug = slug
  }
}
