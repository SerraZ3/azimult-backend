import AdminUserController from "@modules/users/infra/http/controllers/AdminUserController";
import { Router } from "express";
import ResendEmailRegistrationController from "../controllers/ResendEmailRegistrationController";
import adminCreateUserValidator from "../validators/adminCreateUserValidator";
import adminUpdateUserValidator from "../validators/adminUpdateUserValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";

const adminUserRouter = Router();

const userAdminController = new AdminUserController();
const resendEmailRegistrationController = new ResendEmailRegistrationController();

adminUserRouter.get("/email-pending", ensureAuthenticated(["admin"]), userAdminController.listByEmailConfirmationPending);
adminUserRouter.get("/:id", ensureAuthenticated(["admin"]), userAdminController.show);
adminUserRouter.get("/", ensureAuthenticated(["admin"]), userAdminController.index);
adminUserRouter.get("/image/:fileName", ensureAuthenticated(["admin"]), userAdminController.image);
adminUserRouter.put("/:id", ensureAuthenticated(["admin"]), adminUpdateUserValidator, userAdminController.update);
adminUserRouter.post(
  "/",
  // ensureAuthenticated(['admin']),
  adminCreateUserValidator,
  userAdminController.store
);

adminUserRouter.post("/registry-resend-mail", ensureAuthenticated(["admin"]), resendEmailRegistrationController.create);
adminUserRouter.delete("/registry-resend-mail", ensureAuthenticated(["admin"]), resendEmailRegistrationController.delete);

export default adminUserRouter;
