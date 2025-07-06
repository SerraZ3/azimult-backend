import { Router } from "express";
// import tokenAccessGenerateValidator from "../validators/tokenAccessGenerateValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import ScheduleController from "../controllers/ScheduleController";

const routerSchedule = Router();

const scheduleController = new ScheduleController();

routerSchedule.get("/", ensureAuthenticated(["user"]), scheduleController.list);
routerSchedule.get("/:id", ensureAuthenticated(["user"]), scheduleController.show);
routerSchedule.post("/", ensureAuthenticated(["user"]), scheduleController.store);
export default routerSchedule;
