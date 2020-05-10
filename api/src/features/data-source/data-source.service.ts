import shortid from 'shortid'
import { DataSourceEntity } from './data-source.entity'
import { DataSource } from './data-source.interface'
import { Repository, getRepository } from 'typeorm'
import { RabbitMQClient } from '../../util'
import { Resolution, CaptureService } from '../../common/services'

export class DataSourceService {
  private BUCKET = 'data-source-thumbnails'
  private lg = new Resolution(1280, 720)
  private sm = new Resolution(640, 360)
  private repo: Repository<DataSourceEntity>

  public constructor() {
    this.repo = getRepository(DataSourceEntity)
  }

  public async create(
    title: string,
    description: string,
    userId: string,
    data: object,
    persistData: boolean,
    fetchFrequency: number
  ): Promise<DataSource> {
    const dataSource = await this.repo.save(
      new DataSourceEntity(
        title,
        description,
        userId,
        data,
        persistData,
        fetchFrequency
      )
    )
    RabbitMQClient.publish('data_source', dataSource)
    if (dataSource.id) this.capture(dataSource.id)
    return dataSource
  }

  public async select(id: string): Promise<DataSourceEntity | undefined> {
    return await this.repo.findOne(id)
  }

  public async listByUserId(
    userId: string,
    fields: string[],
    searchTerm = '',
    skip = 0,
    take = 0 // default select all
  ): Promise<DataSource[]> {
    fields = fields.map((field) => 'dataSource.' + field)
    return await this.repo
      .createQueryBuilder('dataSource')
      .select(fields)
      .where('dataSource.userId = :userId', { userId })
      .andWhere('LOWER(dataSource.title) like LOWER(:title)', {
        title: '%' + searchTerm + '%',
      })
      .orderBy('dataSource.creationDate', 'DESC')
      .skip(skip)
      .take(take)
      .getMany()
  }

  public async getTotalEntriesByUserId(userId: string): Promise<number> {
    return await this.repo
      .createQueryBuilder('dataSource')
      .select('dataSource.id')
      .where('dataSource.userId = :userId', { userId })
      .getCount()
  }

  public async update(dataSource: DataSource): Promise<DataSourceEntity> {
    const updated = await this.repo.save(dataSource)
    RabbitMQClient.publish('data_source', updated)
    if (updated.id) this.capture(updated.id)
    return updated
  }

  public async remove(dataSource: DataSourceEntity): Promise<DataSource> {
    dataSource = await dataSource.remove()
    RabbitMQClient.publish('data_source', { id: dataSource.id })
    delete dataSource.id
    return dataSource
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }

  private capture(id: string): void {
    const screenshotPath = `/data-sources/${id}?fullscreen`
    CaptureService.capture(id, this.BUCKET, screenshotPath, this.lg, this.sm)
  }
}
