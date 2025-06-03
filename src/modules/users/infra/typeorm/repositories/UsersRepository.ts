import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import dataSourceDB from "@shared/infra/typeorm";
import { MongoRepository, ObjectID } from "typeorm";

import IListUserDTO from "@modules/users/dtos/IListUserDTO";
import User from "../schemas/User";
import cpfCnpj from "@shared/utils/cpfCnpj";

class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    this.ormRepository = dataSourceDB.getMongoRepository(User);
  }

  public async findById(id: ObjectID): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOneBy(id);

    return findAppointment || undefined;
  }

  public async findAll({ perPage = 10, page = 1, orderBy = "isActive", order = "DESC", role, userId, referrerId, isActive, find, fullName, email, cpfCnpj, referralCode }: IListUserDTO): Promise<{ result: User[] | undefined; total: number }> {
    const skip = perPage * page - perPage;

    let where: any = {
      $and: [{}],
    };
    if (find) {
      where.$and.push({
        $or: [
          // {
          //   username: { $regex: find, $options: 'i' },
          // },
          {
            email: { $regex: find, $options: "i" },
          },
          {
            fullName: { $regex: find, $options: "i" },
          },
        ],
      });
    }
    if (referrerId) where.$and.push({ referrerId });
    if (referralCode) where.$and.push({ referralCode });
    if (fullName) where.$and.push({ $or: [{ fullName: { $regex: fullName, $options: "i" } }] });

    if (email) where.$and.push({ $or: [{ email: { $regex: email, $options: "i" } }] });
    if (cpfCnpj) where.$and.push({ $or: [{ cpfCnpj: { $regex: cpfCnpj, $options: "i" } }] });

    if (isActive !== undefined) {
      let _isActive = true;
      if (typeof isActive === "string") {
        _isActive = isActive === "true";
      }
      where.$and.push({
        isActive: _isActive,
      });
    }

    const [result, total] = await this.ormRepository.findAndCount({
      where,

      order: {
        ["isActive"]: order,
        [orderBy]: order,
      },
      skip,
      take: perPage,
    });

    return { result: result || undefined, total: total };
  }
  public async findAllToUpdate(data?: { isActive?: string }): Promise<User[] | undefined> {
    if (data) {
      const isActive = data && data.isActive;
      // const date = data && data.date;
      const where: any = {
        $and: [{}],
      };
      if (isActive !== undefined) {
        let _isActive = true;
        if (typeof isActive === "string") {
          _isActive = isActive === "true";
        }
        where.$and.push({
          isActive: _isActive,
        });
      }

      const result = await this.ormRepository.find({ where });

      return result;
    }
    const result = await this.ormRepository.find({});

    return result;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOneBy({
      email,
    });

    return findAppointment || undefined;
  }
  public async findByDocument(document: string): Promise<User | undefined> {
    const raw = cpfCnpj.onlyNumber(document);
    const formatted = cpfCnpj.isCpfOrCnpj(document)?.formatted;

    if (!raw && !formatted) return undefined;
    const findAppointment = await this.ormRepository.findOne({
      where: {
        $and: [
          { cpfCnpj: { $exists: true } },
          {
            $or: [{ cpfCnpj: raw }, { cpfCnpj: formatted }],
          },
        ],
      },
    });

    return findAppointment || undefined;
  }
  public async findBy(data: any): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOneBy(data);

    return findAppointment || undefined;
  }

  public async create(userData: User): Promise<User> {
    let user = await this.ormRepository.save(userData);

    return user;
  }

  public async save(id: ObjectID, user: User): Promise<User | null> {
    const _user = await this.ormRepository.findOneBy({
      _id: id,
    });
    if (!_user) return null;

    Object.assign(_user, user);

    return this.ormRepository.save(_user);
  }
}

export default UsersRepository;
