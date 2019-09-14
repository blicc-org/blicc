import { SendMailOptions } from 'nodemailer'
import { MAIL_ADDRESS } from '../../config'
import { MailType } from './mail-service'
import { readFile } from 'fs-extra'
import Handlebars, { TemplateDelegate } from 'handlebars'

export class MailGenerator {
  public async generateMail(
    to: string,
    firstName: string,
    lastName: string,
    type: string
  ): Promise<SendMailOptions> {
    switch (type) {
      case MailType.RESET_PASSWORD:
        break
      default:
    }

    var data = {
      title: `${firstName} ${lastName}`,
    }
    const template: any = await this.getMailTemplate()
    const html = template(data)
    return {
      from: MAIL_ADDRESS,
      to,
      subject: 'subject',
      text: data.title,
      html,
    }
  }

  private async getMailTemplate(): Promise<TemplateDelegate<any>> {
    const file = await readFile(`${__dirname}/templates/main.hbs`)
    return Handlebars.compile(file)
  }
}
