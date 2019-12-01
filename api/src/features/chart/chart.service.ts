import { Repository, getRepository } from 'typeorm'
import { ChartEntity } from './chart.entity'
import { Chart } from './chart.interface'
import shortid from 'shortid'

export class ChartService {
  private repo: Repository<ChartEntity>

  public constructor() {
    this.repo = getRepository(ChartEntity)
  }

  public async create(
    title: string,
    bundle: string,
    description: string,
    userId: string,
    path: string
  ): Promise<Chart> {
    return await this.repo.save(
      new ChartEntity(title, bundle, description, userId, path)
    )
  }

  public async selectById(id: string): Promise<Chart | undefined> {
    return await this.repo.findOne({ id })
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }
}
