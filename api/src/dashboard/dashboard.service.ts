import { Repository, getRepository } from 'typeorm'
import { DashboardEntity } from './dashboard.entity'
import { Dashboard } from './dashboard.interface'
import shortid from 'shortid'

export class DashboardService {
  private repo: Repository<DashboardEntity>
  private dashboardFields: string[] = [
    'id',
    'title',
    'userId',
    'creationDate',
    'data',
  ]

  public constructor() {
    this.repo = getRepository(DashboardEntity)
  }

  public async create(
    title: string,
    userId: string,
    data: object
  ): Promise<Dashboard> {
    return await this.repo.save(new DashboardEntity(title, userId, data))
  }

  public async selectById(id: string): Promise<DashboardEntity | undefined> {
    return await this.repo.findOne(id)
  }

  public async selectAllByUserId(
    userId: string,
    fields: string[] = this.dashboardFields
  ): Promise<Dashboard[] | undefined> {
    if (!this.validateFields(fields)) return undefined
    fields = fields.map(field => 'dashboard.' + field)
    return await this.repo
      .createQueryBuilder('dashboard')
      .select(fields)
      .where('dashboard.userId = :userId', { userId })
      .getMany()
  }

  public async update(dashboard: Dashboard): Promise<Dashboard> {
    return await this.repo.save(dashboard)
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }

  public async remove(dashboard: DashboardEntity): Promise<Dashboard> {
    dashboard = await dashboard.remove()
    delete dashboard.id
    return dashboard
  }

  private validateFields(fields: string[]): boolean {
    return fields.every(field => this.dashboardFields.includes(field))
  }
}
