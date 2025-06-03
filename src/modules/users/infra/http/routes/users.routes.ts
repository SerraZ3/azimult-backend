import { Router } from "express";
import AdminUserController from "../controllers/AdminUserController";
import ConfirmUserRegistrationController from "../controllers/ConfirmUserRegistrationController";
import adminCreateUserValidator from "../validators/adminCreateUserValidator";
import confirmEmailUserValidator from "../validators/confirmEmailUserValidator";

const userRouter = Router();

const confirmUserRegistrationController = new ConfirmUserRegistrationController();

const adminUserController = new AdminUserController();

userRouter.post("/registry-confirm", confirmEmailUserValidator, confirmUserRegistrationController.create);

userRouter.post("/sign-up", adminCreateUserValidator, adminUserController.store);
// userRouter.get("/validate-chat-id", checkChatId);

export default userRouter;
