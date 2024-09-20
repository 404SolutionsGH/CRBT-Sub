import { Router } from "express";

// import { accountInfoController, accountUpdateController } from "../controllers/userControllers";
import { verifyJwt } from "../middlewares/verifyJwt";
import { accountInfoController, accountUpdateController } from "../controllers/userControllers";

export const userRouter = Router();
userRouter.put("/update-account-info", verifyJwt, accountUpdateController);
userRouter.get("/account-info", verifyJwt, accountInfoController);
