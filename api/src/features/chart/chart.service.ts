import { Repository, getRepository } from 'typeorm'
import { ChartEntity } from './chart.entity'
import { Chart } from './chart.interface'
import shortid from 'shortid'
import { Slug } from '../../util/slug'

export class ChartService {
  private repo: Repository<ChartEntity>

  public constructor() {
    this.repo = getRepository(ChartEntity)
  }

  public async create(
    title: string,
    bundle: string,
    description: string,
    userId: string
  ): Promise<Chart> {
    const slug = this.generateSlug(title, bundle)
    return await this.repo.save(
      new ChartEntity(title, bundle, description, userId, slug)
    )
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
    fields = fields.map(field => 'chart.' + field)

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
    return await this.repo.save(chart)
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

  private generateSlug(title: string, bundle: string): string {
    return `${Slug.generate(bundle)}/${Slug.generate(title)}`
  }
}
