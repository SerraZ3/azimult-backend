import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ObjectID } from "mongodb";
import { ISchedulesRepository } from "../infra/typeorm/repositories/SchedulesRepository";
interface IRequest {
  date: string;
  quantity: number;
  observation: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class ScheduleCreateService {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute({ date, quantity, observation }: IRequest): Promise<IResponse> {
    //
    // let schedule: any = await this.schedulesRepository.findBy(where);
    // if (!schedule) {
    // throw new AppError("SETTING_DO_NOT_EXIST", 400, [], "Schedule não encontrado");
    // }
    const schedule = await this.schedulesRepository.create({ date: new Date(date), quantity, observation });

    return {
      ...emitter.success("SUCCESS"),
      data: schedule,
    };
  }
}

export default ScheduleCreateService;
