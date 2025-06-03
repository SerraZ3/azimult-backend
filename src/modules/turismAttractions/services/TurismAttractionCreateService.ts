import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ITurismAttractionsRepository } from "../infra/typeorm/repositories/TurismAttractionsRepository";
interface IRequest {
  title: string;
  location: string;
  description: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class TurismAttractionCreateService {
  constructor(
    @inject("TurismAttractionsRepository")
    private turismAttractionsRepository: ITurismAttractionsRepository
  ) {}

  public async execute({ title, location, description }: IRequest): Promise<IResponse> {
    //
    // let turismAttraction: any = await this.turismAttractionsRepository.findBy(where);
    // if (!turismAttraction) {
    // throw new AppError("SETTING_DO_NOT_EXIST", 400, [], "TurismAttraction não encontrado");
    // }
    const turismAttraction = await this.turismAttractionsRepository.create({ title, location, description });

    return {
      ...emitter.success("SUCCESS"),
      data: turismAttraction,
    };
  }
}

export default TurismAttractionCreateService;
