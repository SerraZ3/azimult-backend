import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import time from "@utils/time";

import { inject, injectable } from "tsyringe";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
}
interface IResponse extends ISuccess {}
@injectable()
class ResetPasswordByEmailUserService {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ token }: IRequest): Promise<IResponse> {
    const _token = await this.userTokensRepository.findByToken(token);

    if (
      !_token ||
      _token.isRevoked ||
      (_token.type !== "reset_password" && _token.type !== "new_password")
    ) {
      throw new AppError("INVALID_TOKEN", 400);
    }
    if (time.isExpired(_token.tokenExpiration)) {
      throw new AppError("EXPIRED_TOKEN", 400);
    }

    return {
      ...emitter.success("SUCCESS_TOKEN_VALIDATION"),
    };
  }
}

export default ResetPasswordByEmailUserService;
