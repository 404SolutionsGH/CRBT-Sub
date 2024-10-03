import { Router } from "express";
import { verifyJwt } from "../../interface/middlewares/verifyJwt";
// import { newServiceController, subscribeServiceController, unsubscribeServiceController } from "../controllers/serviceController";
import { isSuperAdminAccount } from "../../interface/middlewares/checkForSuperAdmin";
import { newServiceController, subscribeServiceController } from "../controllers/serviceController";

export const serviceRouter = Router();


// serviceRouter.post("/new-service", verifyJwt, isSuperAdminAccount,newServiceController);

// serviceRouter.post("/subscribe", verifyJwt, subscribeServiceController);

// serviceRouter.post("/unsubscribe", verifyJwt, unsubscribeServiceController);
