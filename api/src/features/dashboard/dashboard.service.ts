import { Repository, getRepository } from 'typeorm'
import { DashboardEntity } from './dashboard.entity'
import { Dashboard } from './dashboard.interface'
import shortid from 'shortid'

export class DashboardService {
  private repo: Repository<DashboardEntity>
  private dashboardFields: string[] = [
    'id',
    'title',
    'description',
    'userId',
    'creationDate',
    'data',
  ]

  public constructor() {
    this.repo = getRepository(DashboardEntity)
  }

  public async create(
    title: string,
    description: string,
    userId: string,
    data: object
  ): Promise<Dashboard> {
    return await this.repo.save(
      new DashboardEntity(title, description, userId, data)
    )
  }

  public async select(id: string): Promise<DashboardEntity | undefined> {
    return await this.repo.findOne(id)
  }

  public async listByUserId(
    userId: string,
    fields: string[] = this.dashboardFields,
    searchTerm = '',
    skip = 0,
    take = 0 // default select all
  ): Promise<Dashboard[] | undefined> {
    if (!this.validateFields(fields)) return undefined
    fields = fields.map(field => 'dashboard.' + field)

    return await this.repo
      .createQueryBuilder('dashboard')
      .select(fields)
      .where('dashboard.userId = :userId', { userId })
      .andWhere('LOWER(dashboard.title) like LOWER(:title)', {
        title: '%' + searchTerm + '%',
      })
      .orderBy('dashboard.creationDate', 'DESC')
      .skip(skip)
      .take(take)
      .getMany()
  }

  public async getTotalEntriesByUserId(
    userId: string,
    searchTerm = ''
  ): Promise<number> {
    return await this.repo
      .createQueryBuilder('dashboard')
      .select('dashboard.id')
      .where('dashboard.userId = :userId', { userId })
      .andWhere('LOWER(dashboard.title) like LOWER(:title)', {
        title: '%' + searchTerm + '%',
      })
      .getCount()
  }

  public async update(dashboard: Dashboard): Promise<DashboardEntity> {
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
