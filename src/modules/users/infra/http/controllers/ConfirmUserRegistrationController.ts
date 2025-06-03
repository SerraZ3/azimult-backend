import RegistryConfirmUserService from "@modules/users/services/RegistryConfirmUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ConfirmUserRegistrationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const registryConfirmUserService = container.resolve(
      RegistryConfirmUserService
    );

    const data = await registryConfirmUserService.execute({
      token,
    });

    return response.status(200).json(data);
  }
}
