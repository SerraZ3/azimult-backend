import { container } from "tsyringe";
import mailConfig from "@config/mail";

import EtherealMailProvider from "./implementations/EtherealMailProvider";
// import SESMailProvider from './implementations/SESMailProvider';
import GodaddyMailProvider from "./implementations/GodaddyMailProvider";
import GmailMailProvider from "./implementations/GmailMailProvider";

import IMailProvider from "./models/IMailProvider";
import GmailOAuth2MailProvider from "./implementations/GmailOAuth2MailProvider";

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  // ses: container.resolve(SESMailProvider),
  godaddy: container.resolve(GodaddyMailProvider),
  gmail: container.resolve(GmailMailProvider),
  gmailOAuth2: container.resolve(GmailOAuth2MailProvider),
};

container.registerInstance<IMailProvider>("MailProvider", providers[mailConfig.driver]);
