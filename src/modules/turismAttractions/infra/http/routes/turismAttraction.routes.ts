import { Router } from "express";
// import tokenAccessGenerateValidator from "../validators/tokenAccessGenerateValidator";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import TurismAttractionController from "../controllers/TurismAttractionController";

const routerTurismAttraction = Router();

const turismAttractionController = new TurismAttractionController();

routerTurismAttraction.get("/", turismAttractionController.list);
routerTurismAttraction.get("/:id", turismAttractionController.show);
routerTurismAttraction.post("/", turismAttractionController.store);

export default routerTurismAttraction;
