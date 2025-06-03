import RememberPasswordUserService from "@modules/users/services/RememberPasswordUserService";
import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    );

    const data = await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(200).json(data);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    let { token } = request.body;
    if (!token) {
      token = request.query.token;
    }

    const rememberPasswordUserService = container.resolve(
      RememberPasswordUserService
    );

    const data = await rememberPasswordUserService.execute({
      token,
    });

    return response.status(200).json(data);
  }
}
