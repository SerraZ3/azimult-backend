import TurismAttractionCreateService from "@modules/turismAttractions/services/TurismAttractionCreateService";
import TurismAttractionListService from "@modules/turismAttractions/services/TurismAttractionListService";
import TurismAttractionShowService from "@modules/turismAttractions/services/TurismAttractionShowService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class TurismAttractionController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = container.resolve(TurismAttractionShowService);

    const data = await service.execute({ id });

    return response.status(200).json(data);
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(TurismAttractionListService);

    const data = await service.execute({});

    return response.status(200).json(data);
  }
  public async store(request: Request, response: Response): Promise<Response> {
    const { title, location, description } = request.body;
    const service = container.resolve(TurismAttractionCreateService);

    const data = await service.execute({ title, location, description });

    return response.status(200).json(data);
  }
}
