import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import fs from "node:fs";
import path from "node:path";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  username: string;
  name: string;
  profession: string;
  file: Express.Multer.File;
  userId: ObjectID;
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class UpdateProfileUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ username, name, profession, file, userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("USER_DO_NOT_EXIST", 400);
    }
    if (username) user.username = username;
    if (name) user.name = name;
    if (profession) user.profession = profession;
    if (file) {
      if (user.avatar) {
        const pathFile = path.join(uploadConfig.path, user.avatar);
        if (fs.existsSync(pathFile)) {
          fs.unlinkSync(pathFile);
        }
      }
      user.avatar = file.filename;
    }
    const userUpdated = await this.usersRepository.save(user._id, user);
    if (!userUpdated) {
      throw new AppError("USER_UPDATE_FAILS", 400);
    }

    return {
      ...emitter.success("SUCCESS_USER_UPDATE"),
      user: userUpdated,
    };
  }
}

export default UpdateProfileUserService;
