import { NextFunction, Request, Response } from "express";

import AppValidationError from "@shared/errors/AppValidationError";
import { validateAll } from "indicative/validator";

export default async function withdrawValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let rules = {
      value: "required|string",
      currency: "required|string",
      wallet: "required",
    };
    await validateAll(req.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
