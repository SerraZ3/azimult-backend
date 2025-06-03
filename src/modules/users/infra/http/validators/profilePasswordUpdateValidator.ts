import { NextFunction, Request, Response } from 'express';

import AppValidationError from '@shared/errors/AppValidationError';
import { validateAll } from 'indicative/validator';

export default async function profilePasswordUpdateValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      currentPassword: 'required|string',
      password: 'required|string',
      passwordConfirmation: 'required|string|same:password',
    };

    const data = req.body;
    await validateAll(data, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
