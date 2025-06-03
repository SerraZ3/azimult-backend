import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import _ from "lodash";
import { inject, injectable } from "tsyringe";
import IListUserDTO from "../dtos/IListUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  data?: IListUserDTO;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class AdminUserResumeService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<IResponse> {
    const users = await this.usersRepository.findAllToUpdate();
    const activeWithCompliance = _.filter(users, (item) => item.isActive === true && !!item.compliance);
    const activeWithoutCompliance = _.filter(users, (item) => item.isActive === true && !item.compliance);
    const disactive = _.filter(users, (item) => !item.isActive);

    let data = {
      active: activeWithCompliance.length,
      withoutCompliance: activeWithoutCompliance.length,
      disactive: disactive.length,
    };

    return { ...emitter.success("SUCCESS"), data };
  }
}

export default AdminUserResumeService;
