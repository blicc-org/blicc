import shortid from 'shortid'
import { DataSourceEntity } from './data-source.entity'
import { DataSource } from './data-source.interface'
import { Repository, getRepository } from 'typeorm'

export class DataSourceService {
  private repo: Repository<DataSourceEntity>

  public constructor() {
    this.repo = getRepository(DataSourceEntity)
  }

  public async create(
    title: string,
    description: string,
    userId: string,
    requestConfig: object,
    persistData: boolean,
    fetchFrequency: number
  ): Promise<DataSource> {
    return await this.repo.save(
      new DataSourceEntity(
        title,
        description,
        userId,
        requestConfig,
        persistData,
        fetchFrequency
      )
    )
  }

  public async select(id: string): Promise<DataSource | undefined> {
    return await this.repo.findOne(id)
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }
}
