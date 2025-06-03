import RegistryCancelSendEmailUserService from '@modules/users/services/RegistryCancelSendEmailUserService';
import RegistryResendEmailUserService from '@modules/users/services/RegistryResendEmailUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResendEmailRegistrationController {
  public async create(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    const registryResendEmailUserService =
      container.resolve(RegistryResendEmailUserService);

    const data =
      await registryResendEmailUserService.execute({
        email,
      });

    return response.status(200).json(data);
  }
  public async delete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    const registryCancelSendEmailUserService =
      container.resolve(RegistryCancelSendEmailUserService);

    const data =
      await registryCancelSendEmailUserService.execute({
        email,
      });

    return response.status(200).json(data);
  }
}
