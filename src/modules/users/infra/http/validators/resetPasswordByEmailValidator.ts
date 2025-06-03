import AppValidationError from "@shared/errors/AppValidationError";
import { NextFunction, Request, Response } from "express";
import { validateAll } from "indicative/validator";

export default async function resetPasswordByEmailValidator(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      password: "required|string",
      passwordConfirm: "required|string|same:password",
      token: "required|string",
      userData: "object",
      "userData.street": "required|string",
      "userData.neighborhood": "required|string",
      "userData.city": "required|string",
      "userData.number": "required|string",
      "userData.complement": "string",
      "userData.cep": "required|string",
      "userData.phone": "required|string",
      "userData.cpfCnpj": "required|string",
    };
    await validateAll(request.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
