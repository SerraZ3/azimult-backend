import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";

import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import time from "@utils/time";
import path from "path";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/schemas/User";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  user: User;
}

interface IResponse extends ISuccess {}

@injectable()
class SendMailRegistrationService {
  constructor(
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ user }: IRequest): Promise<IResponse> {
    const type = "email-verification";
    const tokenObject = await this.userTokensRepository.findByUserId(
      user._id,
      type
    );
    const token = await this.hashProvider.generateHash(`${user.email}-${type}`);
    const isRevoked = false;
    const tokenExpiration = time.datePlusMinutes(10080);
    let newToken;

    if (!tokenObject) {
      newToken = await this.userTokensRepository.create({
        type,
        token,
        isRevoked,
        tokenExpiration,
        userId: user._id,
      });
    } else {
      newToken = await this.userTokensRepository.save(tokenObject._id, {
        isRevoked,
        token,
        tokenExpiration,
      });
    }
    if (!newToken) {
      throw new AppError("TOKEN_SENDING_FAILS", 500);
    }
    const emailVerificationTemplate = path.resolve(
      __dirname,
      "..",
      `views`,
      "email-verification.hbs"
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.fullName,
        email: user.email,
      },
      subject: "Confirmação de email",
      templateData: {
        file: emailVerificationTemplate,
        variables: {
          name: user.fullName,
          url: `${
            process.env.FRONT_URL || "http://localhost:3000"
          }/email-verification?token=${token}`,
          company_name: process.env.NAME_COMPANY || "Criativistas",
        },
      },
    });

    return { ...emitter.success("SUCCESS") };
  }
}

export default SendMailRegistrationService;
