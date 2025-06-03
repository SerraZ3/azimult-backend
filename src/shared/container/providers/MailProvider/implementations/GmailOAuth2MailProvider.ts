import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";
import mailConfig from "@config/mail";
import { google } from "googleapis";

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

const oauth2Client = new google.auth.OAuth2(mailConfig.gmailAuth.clientId, mailConfig.gmailAuth.clientSecret, mailConfig.gmailAuth.redirectUri);

oauth2Client.setCredentials({ refresh_token: mailConfig.gmailAuth.refreshToken });

interface IGmailOAuth2MailProvider extends IMailProvider {
  init(): Promise<void>;
}
@injectable()
export default class GmailOAuth2MailProvider implements IGmailOAuth2MailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {}
  public async init() {
    const accessToken = await oauth2Client.getAccessToken();
    this.client = nodemailer.createTransport({
      service: "gmail",
      socketTimeout: 10000,
      connectionTimeout: 10000,
      auth: {
        type: "OAuth2",
        user: mailConfig.gmailAuth.user,
        clientId: mailConfig.gmailAuth.clientId,
        clientSecret: mailConfig.gmailAuth.clientSecret,
        refreshToken: mailConfig.gmailAuth.refreshToken,
        accessToken: accessToken,
      },
    });
  }
  public async sendMail({ from, to, subject, templateData, attachments }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    await this.init();

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: "azimult@gmail.com",
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
