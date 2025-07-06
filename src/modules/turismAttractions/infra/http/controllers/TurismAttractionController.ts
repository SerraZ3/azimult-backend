import TurismAttractionCreateService from "@modules/turismAttractions/services/TurismAttractionCreateService";
import TurismAttractionListService from "@modules/turismAttractions/services/TurismAttractionListService";
import TurismAttractionRateService from "@modules/turismAttractions/services/TurismAttractionRateService";
import TurismAttractionShowService from "@modules/turismAttractions/services/TurismAttractionShowService";
import TurismAttractionUpdateService from "@modules/turismAttractions/services/TurismAttractionUpdateService";
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
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, location, description } = request.body;
    const service = container.resolve(TurismAttractionUpdateService);

    const data = await service.execute({ id, data: { title, location, description } });

    return response.status(200).json(data);
  }
  public async rate(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id as any;
    const { id: attractionId } = request.params;
    const { message, rate } = request.body;
    const service = container.resolve(TurismAttractionRateService);

    const data = await service.execute({ userId, attractionId, message, rate });

    return response.status(200).json(data);
  }
}
