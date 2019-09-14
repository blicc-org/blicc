import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer'
import { MAIL_USER, MAIL_PASSWORD, MAIL_HOST } from '../../config'

export class MailService {
  private static instance: MailService

  private transporter: Transporter

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    })
  }

  public static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService()
    }
    return MailService.instance
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
