import { Router } from "express";
import AdminUserController from "../controllers/AdminUserController";
import ResetPasswordByEmailController from "../controllers/ResetPasswordByEmailController";
import adminCreateUserValidator from "../validators/adminCreateUserValidator";
import resetPasswordByEmailValidator from "../validators/resetPasswordByEmailValidator";

const userRouter = Router();

const resetPasswordByEmailController = new ResetPasswordByEmailController();

const adminUserController = new AdminUserController();

userRouter.post("/registry-confirm", resetPasswordByEmailValidator, resetPasswordByEmailController.create);

userRouter.post("/sign-up", adminCreateUserValidator, adminUserController.store);
// userRouter.get("/validate-chat-id", checkChatId);

export default userRouter;
