import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ObjectID } from "mongodb";
import { ISchedulesRepository } from "../infra/typeorm/repositories/SchedulesRepository";
import { ITurismAttractionsRepository } from "@modules/turismAttractions/infra/typeorm/repositories/TurismAttractionsRepository";
interface IRequest {
  date: string;
  quantity: number;
  observation: string;
  attractionId: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class ScheduleCreateService {
  constructor(
    @inject("SchedulesRepository")
    private schedulesRepository: ISchedulesRepository,
    @inject("TurismAttractionsRepository")
    private turismAttractionsRepository: ITurismAttractionsRepository
  ) {}

  public async execute({ date, quantity, observation, attractionId }: IRequest): Promise<IResponse> {
    const _attractionId = new ObjectID(attractionId);
    const attraction = await this.turismAttractionsRepository.findById(_attractionId);
    if (!attraction) {
      throw new AppError("ATTRACTION_DO_NOT_EXIST", 400, [], "Atração não encontrada");
    }

    //
    // let schedule: any = await this.schedulesRepository.findBy(where);
    const schedule = await this.schedulesRepository.create({ date: new Date(date), quantity, observation, attractionId: _attractionId });

    return {
      ...emitter.success("SUCCESS"),
      data: schedule,
    };
  }
}

export default ScheduleCreateService;
