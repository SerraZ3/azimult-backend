import CheckUserIsAdminService from "@modules/users/services/CheckUserIsAdminService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

async function checkUserIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const userId = request.user.id as any;

  const checkUserIsAdminService = container.resolve(CheckUserIsAdminService);

  await checkUserIsAdminService.execute({
    userId: userId,
  });

  return next();
}
export default checkUserIsAdmin;
