import ScheduleCreateService from "@modules/schedules/services/ScheduleCreateService";
import ScheduleListService from "@modules/schedules/services/ScheduleListService";
import ScheduleShowService from "@modules/schedules/services/ScheduleShowService";
import ScheduleUpdateService from "@modules/schedules/services/ScheduleUpdateService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ScheduleController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = container.resolve(ScheduleShowService);

    const data = await service.execute({ id });

    return response.status(200).json(data);
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ScheduleListService);

    const data = await service.execute({});

    return response.status(200).json(data);
  }
  public async store(request: Request, response: Response): Promise<Response> {
    const { date, quantity, observation, attractionId } = request.body;
    const service = container.resolve(ScheduleCreateService);

    const data = await service.execute({ date, quantity, observation, attractionId });

    return response.status(200).json(data);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;
    const service = container.resolve(ScheduleUpdateService);

    const data = await service.execute({
      id,
      data: {
        status,
      },
    });

    return response.status(200).json(data);
  }
}
