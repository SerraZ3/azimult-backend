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
}

interface IResponse extends ISuccess {
  token?: UserToken | null;
}

@injectable()
class TokenAccessDisableService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository

  ) { }

  public async execute({ userId, tokenId }: IRequest): Promise<IResponse> {
    if (!tokenId) throw new AppError("INVALID_TOKEN", 400);

    const _id = new ObjectID(userId)
    const user = await this.usersRepository.findById(_id);

    if (!user) {
      throw new AppError("INVALID_USER", 400);
    }


    const _tokenId = new ObjectID(tokenId)
    console.log(_tokenId, _id)
    let token = await this.userTokensRepository.findUserTokenId(_id, _tokenId);
    console.log(token)
    if (!token) {
      throw new AppError("TOKEN_NOT_FOUND", 400);

    }
    const tokenDesabled = Object.assign(token, { isRevoked: true, deletedAt: new Date() })
    await this.userTokensRepository.save(_tokenId, tokenDesabled);



    return { ...emitter.success("SUCCESS_TOKEN_DISABLED"), token };
  }
}

export default TokenAccessDisableService;
