import { Router } from "express";
// import tokenAccessGenerateValidator from "../validators/tokenAccessGenerateValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import ScheduleController from "../controllers/ScheduleController";

const routerSchedule = Router();

const scheduleController = new ScheduleController();

routerSchedule.get(
  "/",
  //  ensureAuthenticated(["admin"]),
  scheduleController.list
);
routerSchedule.get(
  "/:id",
  //  ensureAuthenticated(["admin"]),
  scheduleController.show
);
routerSchedule.post(
  "/",
  //  ensureAuthenticated(["admin"]),
  scheduleController.store
);
export default routerSchedule;
