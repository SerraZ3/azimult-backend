import CheckIfUserHasCreditsService from "@modules/users/services/CheckIfUserHasCreditsService";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

function checkBalanceUser(value?: number): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  const handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const checkIfUserHasCreditsService = container.resolve(CheckIfUserHasCreditsService);

      await checkIfUserHasCreditsService.execute({
        value: value || 0,
        userId,
      });
    } catch (error: any) {
      throw new AppError("USER_NOT_HAVE_FOUNDS", 401);
    }

    return next();
  };
  return handle;
}

export default checkBalanceUser;
