import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import transaction from "@shared/utils/transaction";
import { inject, injectable } from "tsyringe";
import { ObjectID } from "typeorm";

import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  password: string;
  currentPassword: string;
  userId: ObjectID;
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class UpdatePasswordUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    userId,
    password,
    currentPassword,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      currentPassword,
      user.password
    );
    if (!passwordMatched) {
      throw new AppError("PASSWORD_UPDATE_NOT_MATCH", 400);
    }
    await transaction.start();
    const userUpdate = await this.usersRepository.save(userId, {
      password: await this.hashProvider.generateHash(password),
    });
    if (!userUpdate) {
      throw new AppError("PASSWORD_UPDATE_FAILS", 500);
    }
    await transaction.commit();

    return {
      ...emitter.success("SUCCESS_USER_UPDATE"),
      user: userUpdate,
    };
  }
}

export default UpdatePasswordUserService;
