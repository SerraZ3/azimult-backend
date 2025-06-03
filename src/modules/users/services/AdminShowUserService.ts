import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";
import { ObjectID } from 'mongodb';


interface IRequest {
  id: string;
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class AdminShowUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(id)
    const user = await this.usersRepository.findById(_id);
    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }

    return { ...emitter.success("SUCCESS_GET_USER"), user };
  }
}

export default AdminShowUserService;
