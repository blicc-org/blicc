import shortid from 'shortid'
import { DataSourceEntity } from './data-source.entity'
import { Repository, getRepository } from 'typeorm'

export class DataSourceService {
  private repo: Repository<DataSourceEntity>

  public constructor() {
    this.repo = getRepository(DataSourceEntity)
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }
}
