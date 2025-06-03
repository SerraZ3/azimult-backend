import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
}

interface IResponse extends ISuccess {
  isRevoked: Boolean;
  userId?: string;
}

@injectable()
class CheckIfTokenIsValidService {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ token }: IRequest): Promise<IResponse> {
    const userToken = await this.userTokensRepository.findByToken(token);

    const isRevoked = userToken ? userToken.isRevoked : true;

    return {
      ...emitter.success("SUCCESS"),
      isRevoked,
      userId:
        userToken && userToken.userId ? `${userToken?.userId}` : undefined,
    };
  }
}

export default CheckIfTokenIsValidService;
