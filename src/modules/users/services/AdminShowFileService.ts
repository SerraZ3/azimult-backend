import uploadConfig from "@config/upload";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import fs from "node:fs/promises";
import path from "node:path";
import { injectable } from "tsyringe";

interface IRequest {
  fileName: string;
}

interface IResponse extends ISuccess {
  data: any;
}

@injectable()
class AdminShowFileService {
  constructor() {}

  public async execute({ fileName }: IRequest): Promise<IResponse> {
    let file = await fs.readFile(path.join(uploadConfig.path, fileName), { encoding: "base64" });

    if (fileName.includes(".pdf")) {
      return { ...emitter.success("SUCCESS"), data: `data:application/pdf;base64,${file}` };
    }
    return { ...emitter.success("SUCCESS"), data: `data:image/png;base64,${file}` };
  }
}

export default AdminShowFileService;
