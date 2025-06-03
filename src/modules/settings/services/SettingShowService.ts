import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";

import { ObjectID } from "mongodb";
import ISettingsRepository from "../repositories/ISettingsRepository";
interface IRequest {
  key: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class SettingShowService {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  public async execute({ key }: IRequest): Promise<IResponse> {
    const where: any = { type: key };
    let setting: any = await this.settingsRepository.findBy(where);
    if (!setting) {
      throw new AppError("SETTING_DO_NOT_EXIST", 400, [], "Setting não encontrado");
    }

    return {
      ...emitter.success("SUCCESS"),
      data: setting,
    };
  }
}

export default SettingShowService;
