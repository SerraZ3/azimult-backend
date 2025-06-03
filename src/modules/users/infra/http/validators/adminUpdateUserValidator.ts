import { NextFunction, Request, Response } from "express";

import AppValidationError from "@shared/errors/AppValidationError";
import { validateAll } from "indicative/validator";

export default async function adminUpdateUserValidator(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      email: "string|email",
      password: "string|min:8",
      is_active: "boolean",
    };
    await validateAll(request.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
