import { Repository, getRepository } from 'typeorm'
import { ChartEntity } from './chart.entity'
import { Chart } from './chart.interface'
import shortid from 'shortid'
import { Resolution } from '../../common/services'
import { CaptureService } from '../../common/services'

export class ChartService {
  private BUCKET = 'chart-thumbnails'
  private lg = new Resolution(1280, 720)
  private sm = new Resolution(640, 360)
  private repo: Repository<ChartEntity>

  public constructor() {
    this.repo = getRepository(ChartEntity)
  }

  public async create(
    title: string,
    bundle: string,
    description: string,
    key: string,
    slug: string,
    userId: string
  ): Promise<Chart> {
    const chart = await this.repo.save(
      new ChartEntity(title, bundle, description, userId, key, slug)
    )
    if (chart.id) this.capture(chart.id)
    return chart
  }

  public async selectById(id: string): Promise<ChartEntity | undefined> {
    return await this.repo.findOne({ id })
  }

  public async selectAll(
    fields: string[],
    searchTerm = '',
    skip = 0,
    take = 0 // default select all
  ): Promise<Chart[]> {
    fields = fields.map((field) => 'chart.' + field)

    return await this.repo
      .createQueryBuilder('chart')
      .select(fields)
      .where('LOWER(chart.title) like LOWER(:title)', {
        title: '%' + searchTerm + '%',
      })
      .orderBy('chart.creationDate', 'DESC')
      .skip(skip)
      .take(take)
      .getMany()
  }

  public async getTotalEntries(searchTerm = ''): Promise<number> {
    return await this.repo
      .createQueryBuilder('chart')
      .select('chart.id')
      .where('LOWER(chart.title) like LOWER(:title)', {
        title: '%' + searchTerm + '%',
      })
      .getCount()
  }

  public async update(chart: Chart): Promise<ChartEntity> {
    const updated = await this.repo.save(chart)
    if (updated.id) this.capture(updated.id)
    return updated
  }

  public async remove(chart: ChartEntity): Promise<Chart> {
    chart = await chart.remove()
    delete chart.id
    return chart
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }

  private capture(id: string): void {
    const screenshotPath = `/charts/${id}?fullscreen`
    CaptureService.capture(id, this.BUCKET, screenshotPath, this.lg, this.sm)
  }
}
