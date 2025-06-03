import routerSchedule from "@modules/schedules/infra/http/routes/schedule.routes";
import routerTurismAttraction from "@modules/turismAttractions/infra/http/routes/turismAttraction.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import tokenAccessesRouter from "@modules/users/infra/http/routes/tokens.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import { Router } from "express";
import adminRoutes from "./admin";

const routes = Router();

routes.use("/admin", adminRoutes);
routes.use("/password", passwordRouter);
routes.use("/", usersRouter);
routes.use("/token-access", tokenAccessesRouter);

routes.use("/sessions", sessionsRouter);
routes.use("/schedules", routerSchedule);
routes.use("/turism-attractions", routerTurismAttraction);

export default routes;
