import { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { newServiceController } from "./serviceController";
import { isSuperAdminAccount } from "../../middleware/checkForSuperAdmin";
import { checkingForAccount } from "../../middleware/checkAccountExistence";


export const serviceRouter = Router();

serviceRouter.post("/new-service", verifyJwt, isSuperAdminAccount, checkingForAccount,newServiceController);
