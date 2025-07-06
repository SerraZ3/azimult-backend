import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import { ObjectID } from "mongodb";

import { ITurismAttractionsRepository } from "../infra/typeorm/repositories/TurismAttractionsRepository";
import AppError from "@shared/errors/AppError";
import _ from "lodash";
interface IRequest {
  attractionId: string;
  userId: string;
  rate: number;
  message: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class TurismAttractionRateService {
  constructor(
    @inject("TurismAttractionsRepository")
    private turismAttractionsRepository: ITurismAttractionsRepository
  ) {}

  public async execute({ userId, rate, message, attractionId }: IRequest): Promise<IResponse> {
    const _userId = new ObjectID(userId);
    const _attractionId = new ObjectID(attractionId);

    if (rate > 5 || rate < 0) {
      throw new AppError("RATE_TO_MUCH", 400, [], "Rate deve ser no máximo 5, mínimo 1");
    }
    const turismAttraction = await this.turismAttractionsRepository.findById(_attractionId);
    if (!turismAttraction) {
      throw new AppError("ATTRACTION_DO_NOT_EXIST", 400, [], "TurismAttraction não encontrado");
    }

    console.log(rate, message, userId);
    if (turismAttraction.comments && turismAttraction.comments.length > 0) {
      const userExist = _.findIndex(turismAttraction.comments, (item) => item.userId.toString() === userId);
      console.log(userExist);
      if (userExist === -1) {
        turismAttraction.comments.push({ rate, message, userId: _userId });
      } else {
        turismAttraction.comments[userExist] = { rate, message, userId: _userId };
      }
    } else {
      turismAttraction.comments = [{ rate, message, userId: _userId }];
    }
    //
    await this.turismAttractionsRepository.save(turismAttraction._id, turismAttraction);

    return {
      ...emitter.success("SUCCESS"),
      data: turismAttraction,
    };
  }
}

export default TurismAttractionRateService;
