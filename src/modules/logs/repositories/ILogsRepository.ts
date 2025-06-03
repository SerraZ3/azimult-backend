import { ObjectID } from "typeorm";
import Transaction from "../infra/typeorm/schemas/Log";
import Log from "../infra/typeorm/schemas/Log";

export default interface ILogsRepository {
  create(data: Partial<Log>): Promise<Transaction>;

  save(id: ObjectID, user: Partial<Log>): Promise<Transaction | null>;
  saveMany(ids: ObjectID[], data: Partial<Log>): Promise<{ n: number; ok: number }>;
}
