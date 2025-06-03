import AppValidationError from "@shared/errors/AppValidationError";
import { NextFunction, Request, Response } from "express";
import { validateAll } from "indicative/validator";

export default async function loginValidator(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      email: "required|email|string",
      password: "required|string",
    };
    await validateAll(request.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
