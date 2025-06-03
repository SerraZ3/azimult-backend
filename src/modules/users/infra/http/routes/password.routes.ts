import ForgotPasswordController from "@modules/users/infra/http/controllers/ForgotPasswordController";
import { Router } from "express";
import ResetPasswordByEmailController from "../controllers/ResetPasswordByEmailController";
import forgotUserValidator from "../validators/forgotUserValidator";
import resetPasswordByEmailValidator from "../validators/resetPasswordByEmailValidator";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordByEmailController = new ResetPasswordByEmailController();

passwordRouter.post(
  "/forgot",
  forgotUserValidator,
  forgotPasswordController.create
);
passwordRouter.get("/forgot", forgotPasswordController.show);
passwordRouter.put(
  "/reset",
  resetPasswordByEmailValidator,
  resetPasswordByEmailController.create
);

export default passwordRouter;
