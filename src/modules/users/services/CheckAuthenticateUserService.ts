import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import { ObjectID } from "typeorm";
import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  userId: ObjectID;
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class CheckAuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("USER_NOT_FOUND", 400);
    }

    if (!user.isActive) {
      throw new AppError("USER_NOT_ACTIVE", 401);
    }
    // console.log("test")
    // let balance = await this.brokerProvider.getBalance()
    // console.log(balance)
    // // let a = await this.brokerProvider.convert('brl', 'btc', 5.5)

    return {
      ...emitter.success("SUCCESS"),
      user,
    };
  }
}

export default CheckAuthenticateUserService;
