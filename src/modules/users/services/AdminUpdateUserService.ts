import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import User, { TUserRole } from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";
import { ObjectID } from "mongodb";

interface IRequest {
  id: string;
  data: { isActive: boolean; roles: Array<TUserRole>; email?: string; fullName?: string };
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class AdminUpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, data }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(id);

    const user = await this.usersRepository.findById(_id);
    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }
    const newData: any = {};
    if (data.email !== null) newData.email = data.email;
    if (data.fullName && data.fullName !== null) newData.fullName = data.fullName;
    if (data.isActive !== null) newData.isActive = data.isActive;
    if (data.roles !== null) newData.roles = data.roles;
    const userUpdated = await this.usersRepository.save(user._id, newData);
    if (!userUpdated) {
      throw new AppError("USER_UPDATE_FAILS", 400);
    }

    return { ...emitter.success("SUCCESS_USER_UPDATE"), user: userUpdated };
  }
}

export default AdminUpdateUserService;
