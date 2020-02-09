import Mailer, { Transporter, SendMailOptions } from 'nodemailer'
import { MailGenerator } from './mail-generator'
import { User } from '../../../features/user'
import { MAIL_ADDRESS, MAIL_PASSWORD, MAIL_HOST } from '../../../config'
import { Logger } from '../../../util/logger'

export const MailType = {
  WELCOME: 'welcome',
  RESET_PASSWORD: 'reset_password',
}

export class MailService {
  private transporter: Transporter
  private generator: MailGenerator

  public constructor() {
    this.transporter = Mailer.createTransport({
      host: MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: MAIL_ADDRESS,
        pass: MAIL_PASSWORD,
      },
    })
    this.generator = new MailGenerator()
  }

  public async send(user: User, type: string): Promise<void> {
    const { email, firstName, lastName } = user
    try {
      const mail: SendMailOptions = await this.generator.generateMail(
        email,
        firstName,
        lastName,
        type
      )
      await this.transporter.sendMail(mail)
    } catch (e) {
      Logger.error(`[userId: ${user.id}] Failed to send Welcome mail`)
    }
  }
}
