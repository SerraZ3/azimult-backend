import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { container, inject, injectable } from "tsyringe";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import { TUserRole } from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";
import SendMailRegistrationService from "./SendMailRegistrationService";
import stringTools from "@shared/utils/stringTools";

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
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    // password,
    fullName,
    referralCode,
  }: // roles
  IRequest): Promise<IResponse> {
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError("EMAIL_ALREADY_EXISTS", 400);
    }
    if (fullName.trim().split(" ").length <= 1) {
      throw new AppError("FULLNAME_TOO_LOW", 400, [], "Digite o nome o completo!");
    }
    let referrerId: ObjectID;
    console.log(referralCode);
    if (referralCode) {
      const referrerUser = await this.usersRepository.findBy({ referralCode: referralCode });
      if (!referrerUser) throw new AppError("REFERRER_CODE_NOT_FOUND", 400);
      referrerId = referrerUser._id;
    }
    let code: any;
    while (true) {
      code = stringTools.generateRandomString({ size: 10, breakLine: 5 });
      const checkCode = await this.usersRepository.findBy({ referralCode: code });
      if (!checkCode) break;
    }

    const userJson: ICreateUserDTO = {
      isActive: false,
      referrerId,
      referralCode: code,
      roles: ["user"],
      email,
      fullName,
      balances: {
        brl: { value: "0" },
        btc: { value: "0" },
        eth: { value: "0" },
        usdt: { value: "0" },
      },
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
