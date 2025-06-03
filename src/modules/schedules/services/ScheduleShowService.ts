import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ObjectID } from "mongodb";
import { ISchedulesRepository } from "../infra/typeorm/repositories/SchedulesRepository";
interface IRequest {
  id: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class ScheduleShowService {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(id);
    let schedule: any = await this.schedulesRepository.findById(_id);
    if (!schedule) {
      throw new AppError("SCHEDULE_DO_NOT_EXIST", 400, [], "Schedule não encontrado");
    }

    return {
      ...emitter.success("SUCCESS"),
      data: schedule,
    };
  }
}

export default ScheduleShowService;
