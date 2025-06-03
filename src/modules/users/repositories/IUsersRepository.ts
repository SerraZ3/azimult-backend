import { ObjectID } from "typeorm";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IListUserDTO from "../dtos/IListUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import User from "../infra/typeorm/schemas/User";

export default interface IUsersRepository {
  findById(id: ObjectID): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findBy(data: Partial<User>): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;

  save(id: ObjectID, user: IUpdateUserDTO): Promise<User | null>;
  findAllToUpdate(data: any): Promise<User[] | undefined>;
  findAll(data?: any): Promise<{ result: User[] | undefined; total: number }>;
  findByDocument(document: string): Promise<User | undefined>;
}
