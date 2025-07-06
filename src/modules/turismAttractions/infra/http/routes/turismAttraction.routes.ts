import { Router } from "express";
// import tokenAccessGenerateValidator from "../validators/tokenAccessGenerateValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import TurismAttractionController from "../controllers/TurismAttractionController";

const routerTurismAttraction = Router();

const turismAttractionController = new TurismAttractionController();

routerTurismAttraction.get("/", ensureAuthenticated(["user"]), turismAttractionController.list);
routerTurismAttraction.get("/:id", ensureAuthenticated(["user"]), turismAttractionController.show);
routerTurismAttraction.put("/rate/:id", ensureAuthenticated(["user"]), turismAttractionController.rate);
routerTurismAttraction.put("/:id", ensureAuthenticated(["user"]), turismAttractionController.update);
routerTurismAttraction.post("/", ensureAuthenticated(["user"]), turismAttractionController.store);

export default routerTurismAttraction;
