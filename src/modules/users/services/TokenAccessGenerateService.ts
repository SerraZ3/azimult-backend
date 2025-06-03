import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { ObjectID } from "mongodb";
import { inject, injectable } from "tsyringe";
import * as uuid from "uuid";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  description?: string;
  expiresIn: string;
  userId: string;
  key: string;
}

interface IResponse extends ISuccess {
  token: string;
}

@injectable()
class TokenAccessGenerateService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    userId,
    description,
    expiresIn,
    key,
  }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(userId);
    const user = await this.usersRepository.findById(_id);

    if (!user) {
      throw new AppError("INVALID_USER", 400);
    }
    const token = uuid.v4() + uuid.v4();
    // let tokenHashed = await this.hashProvider.generateHash(token);

    const tokenCreated = await this.userTokensRepository.create({
      type: "api-access",
      token,
      isRevoked: false,
      description,
      key,
      tokenExpiration: expiresIn,
      // tokenExpiration,
      userId: user._id,
    });

    return { ...emitter.success("SUCCESS_TOKEN_GENERATE"), token };
  }
}

export default TokenAccessGenerateService;
