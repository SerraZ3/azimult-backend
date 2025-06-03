import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import time from "@utils/time";
import path from "path";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  email: string;
}
type IResponse = ISuccess;
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }

    const type = "reset_password";
    const tokenObject = await this.userTokensRepository.findByUserId(user._id, type);
    const token = await this.hashProvider.generateHash(`${user.email}-${type}`);
    const isRevoked = false;
    const tokenExpiration = time.datePlusMinutes(30);
    let newToken;

    if (!tokenObject) {
      newToken = await this.userTokensRepository.create({
        userId: user._id,
        type,
        token,
        isRevoked,
        tokenExpiration,
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
    const forgotPasswordTemplate = path.resolve(__dirname, "..", `views/`, "reset-password.hbs");

    await this.mailProvider.sendMail({
      to: {
        name: user.username,
        email: user.email,
      },
      subject: `[${process.env.NAME_COMPANY || "SakCripto"}] Recuperação de senha ✔`,
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.username,
          url: `${process.env.RESET_PASSWORD_URL}?token=${token}`,
          company_name: process.env.NAME_COMPANY || "SakCripto",
        },
      },
    });

    return { ...emitter.success("SUCCESS_PASSWORD_SEND_TOKEN") };
  }
}

export default SendForgotPasswordEmailService;
