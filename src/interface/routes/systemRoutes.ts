import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";
import { chapaSecretController, systemStatusController } from "../controllers/systemController";



export const systemRouter= Router()


systemRouter.put("/status",verifyJwt,isSuperAdminAccount,systemStatusController)
systemRouter.put("/chapa-secret-key",verifyJwt,isSuperAdminAccount,chapaSecretController)

