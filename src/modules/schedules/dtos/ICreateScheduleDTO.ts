import { TStatusSchedule } from "../infra/typeorm/schemas/Schedule";

export default interface ICreateScheduleDTO {
  schedule: Date;

  status: TStatusSchedule;

  observation?: string;
  quantity: number;
}
