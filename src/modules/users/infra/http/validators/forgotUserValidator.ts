import AppValidationError from "@shared/errors/AppValidationError";
import { NextFunction, Request, Response } from "express";
import { validateAll } from "indicative/validator";

export default async function forgotUserValidator(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      email: "required|string|email",
    };
    await validateAll(request.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
