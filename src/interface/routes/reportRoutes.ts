import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { createReportController, deleteReportController, getReportController, getReportsController, updateReportController } from "../controllers/reportController";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";

export const reportsRouter = Router();

reportsRouter.post("/", verifyJwt, createReportController);
// reportsRouter.put("/:id", verifyJwt, updateReportController);
reportsRouter.get("/all", verifyJwt, isSuperAdminAccount,getReportsController);
reportsRouter.get("/:id", verifyJwt, getReportController);
reportsRouter.delete("/:id", verifyJwt, deleteReportController);
