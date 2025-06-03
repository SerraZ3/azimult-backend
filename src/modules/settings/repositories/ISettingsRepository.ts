import { ObjectID } from "typeorm";
import ICreateSettingDTO from "../dtos/ICreateSettingDTO";
import IListSettingDTO from "../dtos/IListSettingDTO";
import IUpdateSettingDTO from "../dtos/IUpdateSettingDTO";
import Setting from "../infra/typeorm/schemas/Setting";

export default interface ISettingsRepository {
  findBy(data: Partial<Setting>): Promise<Setting | undefined>;
  findById(id: ObjectID): Promise<Setting | undefined>;
  create(data: Partial<Setting>): Promise<Setting>;

  save(id: ObjectID, user: IUpdateSettingDTO): Promise<Setting | null>;
  saveMany(ids: ObjectID[], data: IUpdateSettingDTO): Promise<{ n: number; ok: number }>;
  findAllToUpdate(data?: { userId?: string; date?: { start: string; end: string }; where?: any }): Promise<Setting[] | undefined>;
  findAll(data?: IListSettingDTO): Promise<{ result: Setting[] | undefined; total: number }>;
}
