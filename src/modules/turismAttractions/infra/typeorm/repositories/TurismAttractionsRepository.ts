import dataSourceDB from "@shared/infra/typeorm";
import { MongoRepository, ObjectID } from "typeorm";

import IListTurismAttractionDTO from "@modules/turismAttractions/dtos/IListTurismAttractionDTO";
import IUpdateTurismAttractionDTO from "@modules/turismAttractions/dtos/IUpdateTurismAttractionDTO";
import TurismAttraction from "../schemas/TurismAttraction";
export interface ITurismAttractionsRepository {
  findBy(data: Partial<TurismAttraction>): Promise<TurismAttraction | undefined>;
  findById(id: ObjectID): Promise<TurismAttraction | undefined>;
  create(data: Partial<TurismAttraction>): Promise<TurismAttraction>;

  save(id: ObjectID, user: IUpdateTurismAttractionDTO): Promise<TurismAttraction | null>;
  saveMany(ids: ObjectID[], data: IUpdateTurismAttractionDTO): Promise<{ n: number; ok: number }>;
  findAllToUpdate(data?: { userId?: string; date?: { start: string; end: string }; where?: any }): Promise<TurismAttraction[] | undefined>;
  findAll(data?: IListTurismAttractionDTO): Promise<{ result: TurismAttraction[] | undefined; total: number }>;
}

class TurismAttractionsRepository implements ITurismAttractionsRepository {
  private ormRepository: MongoRepository<TurismAttraction>;

  constructor() {
    this.ormRepository = dataSourceDB.getMongoRepository(TurismAttraction);
  }

  public async findById(id: ObjectID): Promise<TurismAttraction | undefined> {
    const findAppointment = await this.ormRepository.findOneBy(id);

    return findAppointment || undefined;
  }

  public async findBy(data: Partial<TurismAttraction>): Promise<TurismAttraction | undefined> {
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
    query,
  }: any): Promise<{
    result: TurismAttraction[] | undefined;
    total: number;
  }> {
    perPage = parseInt(perPage.toString());
    page = parseInt(page.toString());

    const skip = perPage * page - perPage;

    let where: any = {
      $and: [{ $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }] }],
    };

    if (where.$and.length === 0) {
      delete where.$and;
    }
    if (query) {
      where.$and.push(query);
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

  public async findAllToUpdate(data?: { userId: string; date: { start: string; end: string }; where?: any }): Promise<TurismAttraction[] | undefined> {
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
  public async findByEmail(email: string): Promise<TurismAttraction | undefined> {
    const findAppointment = await this.ormRepository.findOneBy({
      email,
    });

    return findAppointment || undefined;
  }

  public async create(transactionData: TurismAttraction): Promise<TurismAttraction> {
    let transaction = await this.ormRepository.save(transactionData);

    return transaction;
  }

  public async save(id: ObjectID, transaction: TurismAttraction): Promise<TurismAttraction | null> {
    const _transaction = await this.ormRepository.findOneBy({
      _id: id,
    });
    if (!_transaction) return null;

    Object.assign(_transaction, { ...transaction });
    return this.ormRepository.save(_transaction);
  }

  public async saveMany(id: ObjectID[], transaction: Partial<TurismAttraction>): Promise<{ n: number; ok: number }> {
    const { result } = await this.ormRepository.updateMany({ _id: { $in: id } }, { $set: transaction });

    return result;
  }
}

export default TurismAttractionsRepository;
