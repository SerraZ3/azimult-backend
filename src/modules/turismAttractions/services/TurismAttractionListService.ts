import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ITurismAttractionsRepository } from "../infra/typeorm/repositories/TurismAttractionsRepository";
interface IRequest {}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class TurismAttractionListService {
  constructor(
    @inject("TurismAttractionsRepository")
    private turismAttractionsRepository: ITurismAttractionsRepository
  ) {}

  public async execute({}: IRequest): Promise<IResponse> {
    let turismAttraction: any = await this.turismAttractionsRepository.findAll({});

    return {
      ...emitter.success("SUCCESS"),
      data: turismAttraction,
    };
  }
}

export default TurismAttractionListService;
