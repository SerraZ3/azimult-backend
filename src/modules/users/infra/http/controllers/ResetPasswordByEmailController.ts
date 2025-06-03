import ResetPasswordByEmailUserService from "@modules/users/services/ResetPasswordByEmailUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ResetPasswordByEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password, userData } = request.body;

    const resetPasswordByEmailUserService = container.resolve(
      ResetPasswordByEmailUserService
    );

    const data = await resetPasswordByEmailUserService.execute({
      token,
      password,
      userData,
    });

    return response.status(200).json(data);
  }
}
