import { NextFunction, Request, Response } from "express";

import AppValidationError from "@shared/errors/AppValidationError";
import { validateAll } from "indicative/validator";

export default async function createScheduleValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let rules = {
      url: "required|string",
      name: "required|string",
    };
    await validateAll(req.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
