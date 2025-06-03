import ILogsRepository from "@modules/logs/repositories/ILogsRepository";
import dataSourceDB from "@shared/infra/typeorm";
import { MongoRepository, ObjectID } from "typeorm";

import Log from "../schemas/Log";

class LogsRepository implements ILogsRepository {
  private ormRepository: MongoRepository<Log>;

  constructor() {
    this.ormRepository = dataSourceDB.getMongoRepository(Log);
  }

  public async findById(id: ObjectID): Promise<Log | undefined> {
    const findAppointment = await this.ormRepository.findOneBy(id);

    return findAppointment || undefined;
  }

  public async findBy(data: Partial<Log>): Promise<Log | undefined> {
    const findAppointment = await this.ormRepository.findOneBy(data);

    return findAppointment || undefined;
  }

  public async findAll({
    perPage = 10,
    page = 1,
    orderBy = "createdAt",
    order = "DESC",
    // role,
    // transactionId,
    transactionType,
    userId,
    find,
    date,
  }: any): Promise<{
    result: Log[] | undefined;
    total: number;
  }> {
    perPage = parseInt(perPage.toString());
    page = parseInt(page.toString());

    const skip = perPage * page - perPage;

    let where: any = {
      $and: [{ $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }] }],
    };
    if (userId) {
      where.$and.push({ userId });
    }

    if (transactionType) {
      where.$and.push({ transactionType });
    }
    if (date) {
      const createdAt = { $gte: new Date(date.start), $lt: new Date(date.end) };

      where.$and.push({
        createdAt,
      });
    }
    if (find) {
      where.$and.push({
        $or: [
          // {
          //   transactionname: { $regex: find, $options: 'i' },
          // },
          // {
          //   email: { $regex: find, $options: "i" },
          // },
          // {
          //   fullName: { $regex: find, $options: "i" },
          // },
        ],
      });
    }
    if (where.$and.length === 0) {
      delete where.$and;
    }
    const [result, total] = await this.ormRepository.findAndCount({
      where,

      order: {
        [orderBy]: order,
      },
      skip,
      take: perPage,
    });
    return { result: result || undefined, total: total };
  }

  public async findAllToUpdate(data?: { userId: string; date: { start: string; end: string }; where?: any }): Promise<Log[] | undefined> {
    const userId = data && data.userId;
    const date = data && data.date;
    const where: any = {};
    if (userId) {
      where.$and = [{ userId }];
    }
    if (date) {
      const createdAt = { $gte: new Date(data.date.start), $lt: new Date(data.date.end) };

      if (where.$and) {
        where.$and.push({
          createdAt,
        });
      } else {
        where.$and = [{ createdAt }];
      }
    }
    if (data && data.where) {
      if (where.$and) {
        where.$and.push(data.where);
      } else {
        where.$and = [data.where];
      }
    }

    const result = await this.ormRepository.find({ where });

    return result;
  }
  public async findByEmail(email: string): Promise<Log | undefined> {
    const findAppointment = await this.ormRepository.findOneBy({
      email,
    });

    return findAppointment || undefined;
  }

  public async create(transactionData: Log): Promise<Log> {
    let transaction = await this.ormRepository.save(transactionData);

    return transaction;
  }

  public async save(id: ObjectID, transaction: Log): Promise<Log | null> {
    const _transaction = await this.ormRepository.findOneBy({
      _id: id,
    });
    if (!_transaction) return null;

    Object.assign(_transaction, { ...transaction });
    return this.ormRepository.save(_transaction);
  }

  public async saveMany(id: ObjectID[], transaction: Partial<Log>): Promise<{ n: number; ok: number }> {
    const { result } = await this.ormRepository.updateMany({ _id: { $in: id } }, { $set: transaction });

    return result;
  }
}

export default LogsRepository;
