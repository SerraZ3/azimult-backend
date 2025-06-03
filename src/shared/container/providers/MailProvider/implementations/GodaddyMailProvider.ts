import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";
import mailConfig from "@config/mail";

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export default class GodaddyMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      service: mailConfig.driver,
      host: mailConfig.smtp.host,
      port: mailConfig.smtp.port,
      secure: mailConfig.smtp.secure,
      auth: {
        user: mailConfig.smtp.auth.user,
        pass: mailConfig.smtp.auth.pass,
      },
    });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
    attachments,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: "sakcripto@gmail.com",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
      attachments,
    });
  }
}
