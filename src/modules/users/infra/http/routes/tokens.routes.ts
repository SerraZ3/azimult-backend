import { Router } from "express";
import TokenAccessController from "../controllers/TokenAccessController";
import tokenAccessGenerateValidator from "../validators/tokenAccessGenerateValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";

const tokenRouter = Router();

const tokenAccessController = new TokenAccessController();

tokenRouter.post(
  "/",
  tokenAccessGenerateValidator,
  ensureAuthenticated(["admin", "user"]),
  tokenAccessController.create
);
tokenRouter.get(
  "/",
  ensureAuthenticated(["admin", "user"]),
  tokenAccessController.list
);

tokenRouter.delete(
  "/:id",
  ensureAuthenticated(["admin", "user"]),
  tokenAccessController.disable
);

tokenRouter.put(
  "/:id",
  ensureAuthenticated(["admin", "user"]),
  tokenAccessController.update
);

export default tokenRouter;
