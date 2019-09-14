import { SendMailOptions } from 'nodemailer'
import { MAIL_ADDRESS } from '../../config'

export class MailGenerator {
  generateMail(to: string, type: string): SendMailOptions {
    const subject = 'subject'
    const text = 'text'
    return {
      from: MAIL_ADDRESS,
      to,
      subject,
      text,
      html: `<p>${text}</p>`,
    }
  }
}
