import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import { ObjectID } from "mongodb";

import { ITurismAttractionsRepository } from "../infra/typeorm/repositories/TurismAttractionsRepository";
import { TStatusTurismAttraction } from "../infra/typeorm/schemas/TurismAttraction";
import AppError from "@shared/errors/AppError";
interface IRequest {
  id: string;
  data: {
    title?: string;

    location?: string;
    description?: string;
  };
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class TurismAttractionUpdateService {
  constructor(
    @inject("TurismAttractionsRepository")
    private turismAttractionsRepository: ITurismAttractionsRepository
  ) {}

  public async execute({ id, data: { title, location, description } }: IRequest): Promise<IResponse> {
    const _id = new ObjectID(id);
    let turismAttraction: any = await this.turismAttractionsRepository.findById(_id);
    if (!turismAttraction) {
      throw new AppError("ATTRACTION_DO_NOT_EXIST", 400, [], "TurismAttraction não encontrado");
    }
    const data: any = {};
    if (title) data.title = title;
    if (location) data.location = location;
    if (description) data.description = description;
    console.log(data);

    await this.turismAttractionsRepository.save(turismAttraction._id, data);

    return {
      ...emitter.success("SUCCESS"),
      data: Object.assign(turismAttraction, data),
    };
  }
}

export default TurismAttractionUpdateService;
