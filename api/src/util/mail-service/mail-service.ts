import nodemailer, {
  Transporter,
  SentMessageInfo,
  SendMailOptions,
} from 'nodemailer'
import { MailGenerator } from './mail-generator'
import { MAIL_ADDRESS, MAIL_PASSWORD, MAIL_HOST } from '../../config'

export class MailService {
  private transporter: Transporter
  private generator: MailGenerator

  public constructor() {
    this.transporter = nodemailer.createTransport({
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

  public async send(to: string, type: string): Promise<SentMessageInfo> {
    const mail: SendMailOptions = this.generator.generateMail(to, type)
    return await this.transporter.sendMail(mail)
  }
}
