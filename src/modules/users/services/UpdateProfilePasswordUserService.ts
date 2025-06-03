import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import emitter, {
  ISuccess,
} from '@shared/utils/messageEmitter';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/schemas/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  currentPassword: string;
  password: string;

  userId: ObjectID;
}

interface IResponse extends ISuccess {
  user: User;
}

@injectable()
class UpdateProfilePasswordUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    currentPassword,
    password: _password,
    userId,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(
      userId
    );
    if (!user) {
      throw new AppError('USER_DO_NOT_EXIST', 400);
    }

    const passwordMatched =
      await this.hashProvider.compareHash(
        currentPassword,
        user.password
      );

    if (!passwordMatched) {
      throw new AppError('USER_PASSWORD_FAILS', 400);
    }
    const password = await this.hashProvider.generateHash(
      _password
    );
    user.password = password;

    const userUpdated = await this.usersRepository.save(
      user._id,
      user
    );
    if (!userUpdated) {
      throw new AppError('USER_UPDATE_FAILS', 400);
    }

    return {
      ...emitter.success('SUCCESS_USER_UPDATE'),
      user: userUpdated,
    };
  }
}

export default UpdateProfilePasswordUserService;
