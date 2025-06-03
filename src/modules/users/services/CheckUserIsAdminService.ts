import AppError from '@shared/errors/AppError';
import emitter, { ISuccess } from '@shared/utils/messageEmitter';
import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'typeorm';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: ObjectID;
}

interface IResponse extends ISuccess {}

@injectable()
class CheckUserIsAdminService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('USER_DO_NOT_EXIST', 400);
    }

    const isAdmin = user.roles.includes('admin');
    if (!isAdmin) {
      throw new AppError('UNAUTHORIZED', 401);
    }

    return { ...emitter.success('SUCCESS_USER_IS_ADMIN') };
  }
}

export default CheckUserIsAdminService;
