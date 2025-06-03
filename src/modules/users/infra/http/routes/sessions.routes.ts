import SessionsController from "@modules/users/infra/http/controllers/SessionsController";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import loginValidator from "../validators/loginValidator";

const passwordRouter = Router();

const sessionsController = new SessionsController();

passwordRouter.post("/", loginValidator, sessionsController.create);
passwordRouter.get("/check", ensureAuthenticated(), sessionsController.show);

export default passwordRouter;
