import AppError from "@shared/errors/AppError";

import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { container, inject, injectable } from "tsyringe";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import { TUserRole } from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";
import SendMailRegistrationService from "./SendMailRegistrationService";

interface IRequest {
  email: string;
  password: string;
  fullName: string;
  roles?: Array<TUserRole>;
  referralCode?: string;
}

interface IResponse extends ISuccess {}

@injectable()
class AdminCreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    email,
    // password,
    fullName,
  }: // roles
  IRequest): Promise<IResponse> {
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError("EMAIL_ALREADY_EXISTS", 400);
    }
    if (fullName.trim().split(" ").length <= 1) {
      throw new AppError("FULLNAME_TOO_LOW", 400, [], "Digite o nome o completo!");
    }

    const userJson: ICreateUserDTO = {
      isActive: false,
      roles: ["user"],
      email,
      fullName,
    };

    const user = await this.usersRepository.create(userJson);
    if (!user) {
      throw new AppError("SIGNUP_FAILS", 500);
    }

    const sendMailRegistrationService = container.resolve(SendMailRegistrationService);

    await sendMailRegistrationService.execute({ user });

    return { ...emitter.success("SUCCESS_SIGNUP") };
  }
}

export default AdminCreateUserService;
