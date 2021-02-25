import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
  private client: Transporter;
  
  constructor() {
    nodemailer.createTestAccount().then((account) => { 
      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        },
    });

      this.client = transporter
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {

    // lemos o arquivo do html
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    // compilamos com o handlebars
    const mailTemplateParse = handlebars.compile(templateFileContent)

    // passamos as variaveis ao html
    const html = mailTemplateParse(variables)

    const message = await this.client.sendMail({
      from: 'NPS <noreplay@nps.com.br>',
      to,
      subject,
      html,
    })

    console.log("Message sent: %s", message.messageId)
    console.log("Preview url: %s", nodemailer.getTestMessageUrl(message))

  }

}

export default new SendMailService();