import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import time from "@utils/time";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class RegistryConfirmUserService {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ token }: IRequest): Promise<IResponse> {

    const _token = await this.userTokensRepository.findByToken(token);

    if (!_token || _token.isRevoked || _token.type !== "email-verification") {
      throw new AppError("INVALID_TOKEN", 400);
    }
    if (time.isExpired(_token.tokenExpiration)) {
      throw new AppError("EXPIRED_TOKEN", 400);
    }

    const _user = await this.usersRepository.findById(_token.userId);
    if (!_user) throw new AppError("USER_DO_NOT_EXIST", 400);

    let newToken = await this.userTokensRepository.save(_token._id, {
      isRevoked: true,
    });

    if (!newToken) {
      throw new AppError("TOKEN_SENDING_FAILS", 500);
    }

    const user = await this.usersRepository.save(_token.userId, {
      isActive: true,
    });

    if (!user) {
      throw new AppError("USER_UPDATE_FAILS", 400);
    }

    return { ...emitter.success("SUCCESS_EMAIL_CONFIRMED"), user };
  }
}

export default RegistryConfirmUserService;
