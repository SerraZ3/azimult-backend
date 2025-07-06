import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ObjectID } from "mongodb";
import { ISchedulesRepository } from "../infra/typeorm/repositories/SchedulesRepository";
import { TStatusSchedule } from "../infra/typeorm/schemas/Schedule";
interface IRequest {
  id: string;
  data: {
    status?: TStatusSchedule;
  };
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class ScheduleUpdateService {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute({ id, data: { status } }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(id);
    let schedule: any = await this.schedulesRepository.findById(_id);
    if (!schedule) {
      throw new AppError("SCHEDULE_DO_NOT_EXIST", 400, [], "Schedule não encontrado");
    }
    const data: any = {};
    if (status) data.status = status;
    if (status) {
      await this.schedulesRepository.save(schedule._id, data);
    }
    //
    // let schedule: any = await this.schedulesRepository.findBy(where);

    return {
      ...emitter.success("SUCCESS"),
      data: Object.assign(schedule, data),
    };
  }
}

export default ScheduleUpdateService;
