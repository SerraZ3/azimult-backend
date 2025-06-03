import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import uploadFile from "@shared/utils/uploadFile";
import { Router } from "express";
import ComplianceController from "../controllers/ComplianceController";

const complianceRouter = Router();
const complianceController = new ComplianceController();

complianceRouter.post(
  "/",
  uploadFile.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
    { name: "socialdocument", maxCount: 1 },
  ]),
  ensureAuthenticated(["user"]),
  complianceController.create
);

complianceRouter.put(
  "/",
  uploadFile.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
    { name: "socialdocument", maxCount: 1 },
  ]),
  ensureAuthenticated(["user"]),
  complianceController.update
);

complianceRouter.get("/", ensureAuthenticated(["admin"]), complianceController.list);
complianceRouter.post("/approve", ensureAuthenticated(["admin"]), complianceController.approve);

complianceRouter.post(
  "/upgrade",
  uploadFile.fields([
    { name: "declaration", maxCount: 1 },
    { name: "contract", maxCount: 1 },
    { name: "address", maxCount: 1 },
  ]),
  ensureAuthenticated(["user"]),
  complianceController.sendUpgrade
);
complianceRouter.get("/need-upgrade", ensureAuthenticated(["admin"]), complianceController.listNeedUpgrade);
complianceRouter.post("/need-upgrade/approve", ensureAuthenticated(["admin"]), complianceController.approveUpgrade);

export default complianceRouter;
