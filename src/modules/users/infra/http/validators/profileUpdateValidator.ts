import { NextFunction, Request, Response } from 'express';

import AppValidationError from '@shared/errors/AppValidationError';
import { validateAll } from 'indicative/validator';

export default async function profileUpdateValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      username: 'string',
      name: 'string',
      profession: 'string',
    };

    const data = req.body;
    await validateAll(data, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
