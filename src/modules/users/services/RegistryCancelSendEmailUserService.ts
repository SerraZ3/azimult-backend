import AppError from '@shared/errors/AppError';
import emitter, {
  ISuccess,
} from '@shared/utils/messageEmitter';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}
type IResponse = ISuccess;
@injectable()
class RegistryCancelSendEmailUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({
    email,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(
      email
    );

    if (!user) {
      throw new AppError('USER_DO_NOT_EXIST', 400);
    }
    if (user.isActive) {
      throw new AppError('ALREADY_ACTIVE_USER', 400);
    }
    const type = 'email-verification';
    const tokenObject =
      await this.userTokensRepository.findByUserId(
        user._id,
        type
      );

    const isRevoked = true;

    if (!tokenObject) {
      throw new AppError(
        'TOKEN_RESEND_NOT_EXIST_FAILS',
        500
      );
    }

    const token = await this.userTokensRepository.save(
      tokenObject._id,
      {
        isRevoked,
      }
    );

    if (!token) {
      throw new AppError('TOKEN_CANCEL_FAILS', 500);
    }

    return {
      ...emitter.success('SUCCESS_CANCEL_TOKEN'),
    };
  }
}

export default RegistryCancelSendEmailUserService;
