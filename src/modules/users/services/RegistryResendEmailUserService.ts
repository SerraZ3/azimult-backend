import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import time from "@utils/time";
import path from "path";
import { container, inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import SendMailRegistrationService from "./SendMailRegistrationService";

interface IRequest {
  email: string;
}
type IResponse = ISuccess;
@injectable()
class RegistryResendEmailUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }
    if (user.isActive) {
      throw new AppError("ALREADY_ACTIVE_USER", 400);
    }
    const sendMailRegistrationService = container.resolve(
      SendMailRegistrationService
    );

    await sendMailRegistrationService.execute({ user });

    return { ...emitter.success("SUCCESS_EMAIL_RESEND_TOKEN") };
  }
}

export default RegistryResendEmailUserService;
