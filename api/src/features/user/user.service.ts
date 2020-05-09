import { Repository, getRepository } from 'typeorm'
import { UserEntity } from './user.entity'
import { User } from './user.interface'
import { Hash } from '../../util'
import { MailService } from '../../common/services/mail-service/mail.service'
import { MailType } from '../../common/services/mail-service/mail.service'
import { v4 as uuid } from 'uuid'
import shortid from 'shortid'
import { DataSourceService } from '../data-source/data-source.service'
import {
  dataSourceExample,
  dataSourceExampleTwo,
  dashboardExample,
} from './mocks/user.mock'
import { DashboardService } from '../dashboard/dashboard.service'

export class UserService {
  private repo: Repository<UserEntity>
  private dataSourceService: DataSourceService
  private dashboardService: DashboardService

  public constructor() {
    this.repo = getRepository(UserEntity)
    this.dataSourceService = new DataSourceService()
    this.dashboardService = new DashboardService()
  }

  public async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role = 'user'
  ): Promise<User | undefined> {
    if (await this.exists(email)) return
    const passwordHash = Hash.generate(password)
    const hasTwoFactorAuth = false
    const twoFactorAuthSecret = ''
    const refreshToken = uuid()

    const user = await this.repo.save(
      new UserEntity(
        firstName,
        lastName,
        email,
        passwordHash,
        refreshToken,
        role,
        hasTwoFactorAuth,
        twoFactorAuthSecret
      )
    )

    delete user.twoFactorAuthSecret
    delete user.passwordHash
    delete user.refreshToken

    await new MailService().send(user, MailType.WELCOME)
    return user
  }

  public async generateId(): Promise<string> {
    const id = shortid.generate()
    const response = await this.repo.findOne(id)
    return response === undefined ? id : await this.generateId()
  }

  public async selectByEmailWithRefreshToken(
    email: string
  ): Promise<User | undefined> {
    return await this.repo
      .createQueryBuilder('user')
      .addSelect('user.refreshToken')
      .where('user.email = :email', { email })
      .getOne()
  }

  public async selectById(id: string): Promise<User | undefined> {
    return await this.repo.findOne(id)
  }

  public async selectByIdWithRefreshToken(
    id: string
  ): Promise<User | undefined> {
    return await this.repo
      .createQueryBuilder('user')
      .addSelect('user.refreshToken')
      .where('user.id = :id', { id })
      .getOne()
  }

  public async list(
    fields: string[],
    searchTerm = '',
    skip = 0,
    take = 0 // default select all
  ): Promise<User[]> {
    fields = fields.map((field) => 'user.' + field)

    return await this.repo
      .createQueryBuilder('user')
      .select(fields)
      .andWhere(
        'LOWER(user.firstName) like LOWER(:firstName) OR LOWER(user.lastName) like LOWER(:lastName)',
        {
          firstName: '%' + searchTerm + '%',
          lastName: '%' + searchTerm + '%',
        }
      )
      .orderBy('user.creationDate', 'DESC')
      .skip(skip)
      .take(take)
      .getMany()
  }

  public async getTotalEntries(): Promise<number> {
    return await this.repo
      .createQueryBuilder('user')
      .select('user.id')
      .getCount()
  }

  public async exists(email: string): Promise<boolean> {
    return (await this.repo.findOne({ email })) !== undefined
  }

  public async update(user: User): Promise<User> {
    return await this.repo.save(user)
  }

  public async deleteById(id: string): Promise<boolean> {
    const deleteResult = await this.repo.delete({ id })
    return deleteResult.affected === 1
  }

  public async createExamples(userId: string): Promise<void> {
    const { id: dataSourceId = '' } = await this.dataSourceService.create(
      dataSourceExample.title,
      dataSourceExample.description,
      userId,
      dataSourceExample.data,
      dataSourceExample.persistData,
      dataSourceExample.fetchFrequency
    )
    const { id: dataSourceIdTwo = '' } = await this.dataSourceService.create(
      dataSourceExampleTwo.title,
      dataSourceExampleTwo.description,
      userId,
      dataSourceExampleTwo.data,
      dataSourceExampleTwo.persistData,
      dataSourceExampleTwo.fetchFrequency
    )

    /*eslint-disable */
    dashboardExample.data.settings[
      '54e7932b-e246-415d-ab1a-eda5411a9033'
    ].data_source = dataSourceId
    dashboardExample.data.settings[
      'ee76dfb4-8328-41b7-a628-9a9a01f2169a'
    ].data_source = dataSourceId
    dashboardExample.data.settings[
      '733ee4d4-8815-415a-bc8b-df348f99ed77'
    ].data_source = dataSourceIdTwo
    /*eslint-enable */

    const { id: dashboardId = '' } = await this.dashboardService.create(
      dashboardExample.title,
      dashboardExample.description,
      userId,
      dashboardExample.data
    )

    this.dashboardService.capture(dashboardId)
  }
}
