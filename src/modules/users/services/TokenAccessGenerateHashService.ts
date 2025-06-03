import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { ObjectID } from "mongodb";
import { inject, injectable } from "tsyringe";
import * as uuid from "uuid";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
}

interface IResponse extends ISuccess {
  token: string;
}

@injectable()
class TokenAccessGenerateHashService {
  constructor(
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token }: IRequest): Promise<IResponse> {
    let tokenHashed = await this.hashProvider.generateHash(token);

    return { ...emitter.success("SUCCESS_TOKEN_GENERATE"), token: tokenHashed };
  }
}

export default TokenAccessGenerateHashService;
