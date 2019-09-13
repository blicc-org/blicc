import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer'
import { MAIL_USER, MAIL_PASSWORD, MAIL_HOST } from '../config'

export class MailDistributor {
  private static instance: MailDistributor

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

  public static getInstance(): MailDistributor {
    if (!MailDistributor.instance) {
      MailDistributor.instance = new MailDistributor()
    }
    return MailDistributor.instance
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
