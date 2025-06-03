import adminUserRouter from "@modules/users/infra/http/routes/admin.users.routes";
import { Router } from "express";

const adminRoutes = Router();

adminRoutes.use("/users", adminUserRouter);

export default adminRoutes;
