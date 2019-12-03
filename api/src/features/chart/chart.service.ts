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

  public async selectById(id: string): Promise<Chart | undefined> {
    return await this.repo.findOne({ id })
  }

  public async selectAll(
    searchTerm = '',
    skip = '0',
    take = '0' // default select all
  ): Promise<Chart[] | undefined> {
    const skipNumber = parseInt(skip)
    const takeNumber = parseInt(take)
    if (!Number.isInteger(skipNumber) || !Number.isInteger(takeNumber)) {
      return undefined
    }

    searchTerm = this.escapeSearchQuery(searchTerm)
    return await this.repo
      .createQueryBuilder('chart')
      .where('LOWER(chart.title) like LOWER(:title)', {
        title: '%' + searchTerm + '%',
      })
      .orderBy('chart.creationDate', 'DESC')
      .skip(skipNumber)
      .take(takeNumber)
      .getMany()
  }

  public async getTotalEntries(searchTerm = ''): Promise<number> {
    searchTerm = this.escapeSearchQuery(searchTerm)
    return await this.repo
      .createQueryBuilder('chart')
      .select('chart.id')
      .where('LOWER(chart.title) like LOWER(:title)', {
        title: '%' + searchTerm + '%',
      })
      .getCount()
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }

  private generateSlug(title: string, bundle: string): string {
    return `${Slug.generate(bundle)}/${Slug.generate(title)}`
  }

  private escapeSearchQuery(str: string): string {
    return str.replace(/[^\w\s!?]/g, '')
  }
}
