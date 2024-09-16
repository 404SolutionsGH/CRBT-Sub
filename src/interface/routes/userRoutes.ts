import { Router } from "express";

// import { accountInfoController, accountUpdateController } from "../controllers/userControllers";
import { verifyJwt } from "../middlewares/verifyJwt";

export const userRouter = Router();
// userRouter.put("/update-account-info", verifyJwt, accountUpdateController);
// userRouter.get("/account-info", verifyJwt, getAccount, accountInfoController);
