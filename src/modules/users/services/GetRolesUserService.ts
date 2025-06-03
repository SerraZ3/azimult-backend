import AppError from '@shared/errors/AppError';
import emitter, { ISuccess } from '@shared/utils/messageEmitter';
import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'typeorm';
import { TUserRole } from '../infra/typeorm/schemas/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: ObjectID;
}

interface IResponse extends ISuccess {
  roles: Array<TUserRole>;
}

@injectable()
class GetRolesUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('USER_DO_NOT_EXIST', 400);
    }

    return { ...emitter.success('SUCCESS_USER_HAS_ROLE'), roles: user.roles };
  }
}

export default GetRolesUserService;
