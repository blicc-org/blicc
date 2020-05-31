import { Repository, getRepository } from 'typeorm'
import { DashboardEntity } from './dashboard.entity'
import { Dashboard } from './dashboard.interface'
import shortid from 'shortid'
import { CaptureService, Resolution } from '../../common/services'

type Data = any

export class DashboardService {
  private BUCKET = 'dashboard-thumbnails'
  private lg = new Resolution(1280, 720)
  private sm = new Resolution(640, 360)
  private repo: Repository<DashboardEntity>

  public constructor() {
    this.repo = getRepository(DashboardEntity)
  }

  public async create(
    title: string,
    description: string,
    userId: string,
    data: Data
  ): Promise<Dashboard> {
    const dashboard = await this.repo.save(
      new DashboardEntity(title, description, userId, data)
    )
    if (dashboard.id) this.capture(dashboard.id)
    return dashboard
  }

  public async select(id: string): Promise<DashboardEntity | undefined> {
    return await this.repo.findOne(id)
  }

  public async listByUserId(
    userId: string,
    fields: string[],
    searchTerm = '',
    skip = 0,
    take = 0 // default select all
  ): Promise<Dashboard[]> {
    fields = fields.map((field) => 'dashboard.' + field)

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
    const updated = await this.repo.save(dashboard)
    if (updated.id) this.capture(updated.id)
    return updated
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

  private capture(id: string): void {
    const screenshotPath = `/dashboards/${id}?fullscreen`
    CaptureService.capture(id, this.BUCKET, screenshotPath, this.lg, this.sm)
  }
}
