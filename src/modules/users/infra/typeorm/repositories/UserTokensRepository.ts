import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import dataSourceDB from '@shared/infra/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';

import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';
import UserToken from '../schemas/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: MongoRepository<UserToken>;

  constructor() {
    this.ormRepository = dataSourceDB.getMongoRepository(UserToken);
  }
  public async findActiveTokenAuth(
    userId: ObjectID,
    type = 'authentication'
  ): Promise<UserToken | null> {
    const token = await this.ormRepository.findOneBy({
      userId,
      type,
      isRevoked: false,
    });
    return token;
  }
  public async findByStatusPending(type = 'reset-password'): Promise<UserToken[] | null> {
    const token: any = await this.ormRepository.aggregate([
      {
        // Pego sala pelo id
        $match: {
          type,
          isRevoked: false,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        // Remove o usuário de array
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          'user.password': 0,
        },
      },
    ]);
    const toReturn = await token.toArray();

    return toReturn;
  }
  public async findActiveUserTokens(userId: ObjectID, type = 'reset-password'): Promise<UserToken[]> {

    const result = await this.ormRepository.findBy({
      where: {
        type,
        isRevoked: false,
        userId
      },
    });



    return result;
  }
  public async findByUserId(userId: ObjectID, type = 'reset-password'): Promise<UserToken | null> {
    const token = await this.ormRepository.findOneBy({ userId, type });
    return token;
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const _token = await this.ormRepository.findOneBy({ token });
    return _token;
  }
  public async findUserTokenId(userId: ObjectID, tokenId: ObjectID): Promise<UserToken | null> {
    const _token = await this.ormRepository.findOneBy({ _id: tokenId, userId });
    return _token;
  }
  public async create(dataToken: ICreateUserTokenDTO): Promise<UserToken | null> {
    let userToken: UserToken;

    userToken = this.ormRepository.create(dataToken);
    return this.ormRepository.save(userToken);
  }

  public async save(id: ObjectID, dataToken: UserToken): Promise<UserToken | null> {
    const _token = await this.ormRepository.findOneBy(id);
    if (!_token) return null;

    Object.assign(_token, dataToken);

    return this.ormRepository.save(_token);
  }
}

export default UserTokensRepository;
