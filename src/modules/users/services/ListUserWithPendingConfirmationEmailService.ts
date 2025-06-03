import AppError from '@shared/errors/AppError';
import emitter, { ISuccess } from '@shared/utils/messageEmitter';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {}
interface IResponse extends ISuccess {
  users: any;
}

@injectable()
class ListUserWithPendingConfirmationEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute(): Promise<IResponse> {
    const tokens = await this.userTokensRepository.findByStatusPending('email-verification');

    if (!tokens) {
      throw new AppError('USERS_NOT_FOUND', 400);
    }

    return {
      ...emitter.success('SUCCESS'),
      users: tokens,
    };
  }
}

export default ListUserWithPendingConfirmationEmailService;
