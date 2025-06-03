import { NextFunction, Request, Response } from "express";

import AppValidationError from "@shared/errors/AppValidationError";
import { validateAll } from "indicative/validator";

export default async function adminCreateUserValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      fullName: "required|string",
      email: "required|string|email",

      // roles: 'required|in:user',
    };
    await validateAll(req.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
