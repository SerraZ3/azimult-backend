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
}

interface IResponse extends ISuccess {
  tokens?: UserToken[];
}

@injectable()
class TokenAccessListService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(userId);
    const user = await this.usersRepository.findById(_id);

    if (!user) {
      throw new AppError("INVALID_USER", 400);
    }

    let tokens = await this.userTokensRepository.findActiveUserTokens(_id, "api-access");
    console.log(tokens);
    tokens = tokens.map((token) => token.toJSON());

    return { ...emitter.success("SUCCESS_TOKEN_GENERATE"), tokens };
  }
}

export default TokenAccessListService;
