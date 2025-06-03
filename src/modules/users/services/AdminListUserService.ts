import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import IListUserDTO from "../dtos/IListUserDTO";
import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";
import _ from "lodash";

interface IRequest {
  data?: IListUserDTO;
}

interface IResponse extends ISuccess {
  users: User[];
  total: number;
}

@injectable()
class AdminListUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ data }: IRequest): Promise<IResponse> {
    const { result: users, total } = await this.usersRepository.findAll({ ...data });
    if (!users) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }
    const usersOrder = _.orderBy(users, ["isActive", "compliance.status"], ["desc", "asc"]);
    return { ...emitter.success("SUCCESS_USERS_LIST"), users: usersOrder, total, ...data };
  }
}

export default AdminListUserService;
