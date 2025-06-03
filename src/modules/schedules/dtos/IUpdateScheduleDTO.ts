import { TStatusSchedule } from "../infra/typeorm/schemas/Schedule";

export default interface IUpdateScheduleDTO {
  schedule?: Date;

  status?: TStatusSchedule;

  observation?: string;
  quantity?: number;
}
