import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { ObjectID } from "mongodb";
import { inject, injectable } from "tsyringe";
import UserToken from "../infra/typeorm/schemas/UserToken";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  userId: string;
  tokenId: string;
  key?: string;
}

interface IResponse extends ISuccess {
  token?: UserToken | null;
}

@injectable()
class TokenAccessUpdateService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ userId, tokenId, key }: IRequest): Promise<IResponse> {
    if (!tokenId) throw new AppError("INVALID_TOKEN", 400);

    const _id = new ObjectID(userId);
    const user = await this.usersRepository.findById(_id);

    if (!user) {
      throw new AppError("INVALID_USER", 400);
    }

    const _tokenId = new ObjectID(tokenId);
    console.log(_id, _tokenId);

    let token = await this.userTokensRepository.findUserTokenId(_id, _tokenId);

    if (!token) {
      throw new AppError("TOKEN_NOT_FOUND", 400);
    }
    console.log(token);

    const tokenDesabled = Object.assign(token, { key });
    await this.userTokensRepository.save(_tokenId, tokenDesabled);
    console.log(tokenDesabled);

    return { ...emitter.success("SUCCESS_TOKEN_UPDATED"), token };
  }
}

export default TokenAccessUpdateService;
