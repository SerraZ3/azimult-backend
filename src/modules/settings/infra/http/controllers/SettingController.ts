import SettingShowService from "@modules/settings/services/SettingShowService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SettingController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { key } = request.params;
    const service = container.resolve(SettingShowService);

    const data = await service.execute({ key });

    return response.status(200).json(data);
  }
}
