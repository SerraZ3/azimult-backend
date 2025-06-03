import TokenAccessDisableService from "@modules/users/services/TokenAccessDisableService";
import TokenAccessGenerateService from "@modules/users/services/TokenAccessGenerateService";
import TokenAccessListService from "@modules/users/services/TokenAccessListService";
import TokenAccessUpdateService from "@modules/users/services/TokenAccessUpdateService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class TokenAccessController {
  public async list(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id as any;

    const tokenAccessListService = container.resolve(TokenAccessListService);

    const data = await tokenAccessListService.execute({
      userId,
    });

    return response.status(200).json(data);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id as any;
    const { description, expiresIn, key } = request.body;
    const tokenAccessGenerateService = container.resolve(
      TokenAccessGenerateService
    );

    const data = await tokenAccessGenerateService.execute({
      description,
      expiresIn,
      userId,
      key,
    });

    return response.status(200).json(data);
  }
  public async disable(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userId = request.user.id as any;
    const { id } = request.params;
    const tokenAccessDisableService = container.resolve(
      TokenAccessDisableService
    );

    const data = await tokenAccessDisableService.execute({
      tokenId: id,
      userId,
    });

    return response.status(200).json(data);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id as any;
    const { key } = request.body;
    const { id } = request.params;
    const tokenAccessUpdateService = container.resolve(
      TokenAccessUpdateService
    );

    const data = await tokenAccessUpdateService.execute({
      tokenId: id,
      userId,
      key,
    });

    return response.status(200).json(data);
  }
}
