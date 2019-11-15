import { SendMailOptions } from 'nodemailer'
import Handlebars, { TemplateDelegate } from 'handlebars'
import { readFile } from 'fs-extra'
import { MAIL_ADDRESS } from '../../config'
import { MailType } from './mail-service'
import { MailOptions } from './mail-options.interface'

export class MailGenerator {
  public async generateMail(
    to: string,
    firstName: string,
    lastName: string,
    type: string
  ): Promise<SendMailOptions> {
    let subject = ''
    let template: TemplateDelegate<MailOptions>

    switch (type) {
      case MailType.RESET_PASSWORD:
        subject = 'Reset Password'
        template = await this.getMailTemplate(MailType.RESET_PASSWORD)
        break
      default:
        subject = `Welcome ${firstName} ${lastName}`
        template = await this.getMailTemplate(MailType.WELCOME)
    }

    return {
      from: MAIL_ADDRESS,
      to,
      subject,
      html: template({
        subject,
        firstName,
        lastName,
      }),
    }
  }

  private async getMailTemplate(
    templateName: string
  ): Promise<TemplateDelegate<MailOptions>> {
    const file = await readFile(`${__dirname}/templates/${templateName}.hbs`)
    return Handlebars.compile(file.toString())
  }
}
