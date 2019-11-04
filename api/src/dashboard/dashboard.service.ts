import { Repository, getRepository } from 'typeorm'
import { DashboardEntity } from './dashboard.entity'
import { Dashboard } from './dashboard.interface'
import shortid from 'shortid'

export class DashboardService {
  private repo: Repository<DashboardEntity>

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

  public async selectAllByUserId(userId: string): Promise<Dashboard[]> {
    return await this.repo.find({ where: { userId } })
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
}
