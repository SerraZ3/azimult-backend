import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ObjectID } from "mongodb";
import { ITurismAttractionsRepository } from "../infra/typeorm/repositories/TurismAttractionsRepository";
import _ from "lodash";
interface IRequest {
  id: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class TurismAttractionShowService {
  constructor(
    @inject("TurismAttractionsRepository")
    private turismAttractionsRepository: ITurismAttractionsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(id);
    let turismAttraction: any = await this.turismAttractionsRepository.findById(_id);
    if (!turismAttraction) {
      throw new AppError("SCHEDULE_DO_NOT_EXIST", 400, [], "TurismAttraction não encontrado");
    }
    if (turismAttraction.comments) {
      const total = _.sumBy(turismAttraction.comments, (item: any) => item.rate);
      turismAttraction.rate = total / turismAttraction.comments.length;
    }

    return {
      ...emitter.success("SUCCESS"),
      data: turismAttraction,
    };
  }
}

export default TurismAttractionShowService;
