import { Router } from "express";
// import tokenAccessGenerateValidator from "../validators/tokenAccessGenerateValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import ScheduleController from "../controllers/ScheduleController";

const routerSchedule = Router();

const scheduleController = new ScheduleController();

routerSchedule.get("/:id", ensureAuthenticated(["user"]), scheduleController.show);
routerSchedule.put("/:id", ensureAuthenticated(["manager"]), scheduleController.update);
routerSchedule.get("/", ensureAuthenticated(["user"]), scheduleController.list);
routerSchedule.post("/", ensureAuthenticated(["user"]), scheduleController.store);
export default routerSchedule;
