import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer'
import { MailGenerator } from './mail-generator'
import { MAIL_USER, MAIL_PASSWORD, MAIL_HOST } from '../../config'

export class MailService {
  private transporter: Transporter
  private generator: MailGenerator

  public constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    })
    this.generator = new MailGenerator()
  }

  public async send(
    to: string,
    subject: string,
    text: string
  ): Promise<SentMessageInfo> {
    return await this.transporter.sendMail({
      from: '"blicc.org" <noreply@blicc.org>',
      to,
      subject,
      text,
      html: `<p>${text}</p>`,
    })
  }
}
