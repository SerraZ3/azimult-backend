import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import CheckAuthenticateUserService from "@modules/users/services/CheckAuthenticateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id as any;

    const checkSessionUser = container.resolve(CheckAuthenticateUserService);

    const data = await checkSessionUser.execute({
      userId,
    });

    return response.status(200).json(data);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const data = await authenticateUser.execute({
      email,
      password,
      ip: request.ip as string,
    });

    return response.status(200).json(data);
  }
}
