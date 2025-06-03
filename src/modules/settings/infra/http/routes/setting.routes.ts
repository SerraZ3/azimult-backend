import { Router } from "express";
// import tokenAccessGenerateValidator from "../validators/tokenAccessGenerateValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import SettingController from "../controllers/SettingController";

const router = Router();

const settingController = new SettingController();

router.get("/:key", ensureAuthenticated(["admin"]), settingController.show);

export default router;
