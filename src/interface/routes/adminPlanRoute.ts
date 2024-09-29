import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { createPlanController, getAllPlansController, planSubcriptionController } from "../controllers/adminPlanControllers";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";



export const adminPlanRouter= Router()


adminPlanRouter.post("/create",verifyJwt,isSuperAdminAccount,createPlanController)
adminPlanRouter.get("/all",verifyJwt,getAllPlansController)
adminPlanRouter.post("/subscribe/:planId",verifyJwt,planSubcriptionController)