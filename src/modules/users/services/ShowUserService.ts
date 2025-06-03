import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  id: ObjectID;
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class ShowUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }

    return { ...emitter.success("SUCCESS"), user };
  }
}

export default ShowUserService;
