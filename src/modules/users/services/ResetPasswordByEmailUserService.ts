import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import time from "@utils/time";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import { cnpj, cpf } from "cpf-cnpj-validator";
import cpfCnpj from "@shared/utils/cpfCnpj";
interface IRequest {
  token: string;
  password: string;
  userData?: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string;
    complement: string;
    cep: string;
    phone: string;
    cpfCnpj: string;
  };
}
type IResponse = ISuccess;
@injectable()
class ResetPasswordUserService {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password, userData }: IRequest): Promise<IResponse> {
    const _token = await this.userTokensRepository.findByToken(token);
    if (!_token || _token.isRevoked || !["email-verification", "reset_password", "new_password"].includes(_token.type)) {
      throw new AppError("INVALID_TOKEN", 400);
    }
    if (time.isExpired(_token.tokenExpiration)) {
      throw new AppError("EXPIRED_TOKEN", 400);
    }

    const user = await this.usersRepository.findById(_token.userId);

    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }
    if (!user.isActive && !userData) {
      throw new AppError("INVALID_DATA", 400);
    }
    if (userData) {
      let checkData = "";
      if (userData.cpfCnpj.length > 14) {
        checkData = cnpj.isValid(userData.cpfCnpj) ? "" : "CNPJ";
      } else {
        checkData = cpf.isValid(userData.cpfCnpj) ? "" : "CPF";
      }
      if (checkData) {
        throw new AppError("INVALID_" + checkData, 400);
      }
    }
    const updateToken = await this.userTokensRepository.save(_token._id, {
      isRevoked: true,
    });
    if (!updateToken) {
      throw new AppError("INVALID_TOKEN", 400);
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const updateUser = await this.usersRepository.save(user._id, {
      ...userData,
      password: passwordHash,
      isActive: true,
    });

    if (!updateUser) {
      throw new AppError("USER_UPDATE_FAILS", 400);
    }

    return { ...emitter.success("SUCCESS_PASSWORD_UPDATE") };
  }
}

export default ResetPasswordUserService;
