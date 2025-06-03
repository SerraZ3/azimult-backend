import { ObjectID } from 'typeorm';
import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import IUpdateTokenDTO from '../dtos/IUpdateUserTokenDTO';
import UserToken from '../infra/typeorm/schemas/UserToken';

export default interface IUserTokensRepository {
  findByUserId(userId: ObjectID, type: string): Promise<UserToken | null>;
  findByToken(token: string): Promise<UserToken | null>;
  findUserTokenId(userId: ObjectID, tokenId: ObjectID): Promise<UserToken | null>;
  create(dataToken: ICreateUserTokenDTO): Promise<UserToken | null>;
  save(id: ObjectID, dataToken: IUpdateTokenDTO): Promise<UserToken | null>;
  findByStatusPending(type: string): Promise<UserToken[] | null>;
  findActiveTokenAuth(userId: ObjectID, type?: string): Promise<UserToken | null>;
  findActiveUserTokens(userId: ObjectID, type?: string): Promise<UserToken[]>;
}
