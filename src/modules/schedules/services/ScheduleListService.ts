import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ISchedulesRepository } from "../infra/typeorm/repositories/SchedulesRepository";
interface IRequest {}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class ScheduleListService {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository
  ) {}

  public async execute({}: IRequest): Promise<IResponse> {
    let schedule: any = await this.schedulesRepository.findAll({});

    return {
      ...emitter.success("SUCCESS"),
      data: schedule,
    };
  }
}

export default ScheduleListService;
