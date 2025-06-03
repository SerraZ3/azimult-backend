import AppValidationError from "@shared/errors/AppValidationError";
import { NextFunction, Request, Response } from "express";
import { validateAll } from "indicative/validator";

export default async function signUpValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      username: "required|string",
      email: "required|string|email",
      password: "required|string",
      passwordConfirm: "required|string|same:password",
      profession: "required|string",
      foundUsThrough: "required|string",
      plan: "required|string",
    };
    await validateAll(req.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
