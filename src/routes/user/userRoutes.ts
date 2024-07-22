import { Router } from "express";
import { checkingForAccount } from "../../middleware/checkAccountExistence";
import { accountInfoController, accountUpdateController } from "./userControllers";
import { verifyJwt } from "../../middleware/verifyJwt";
import { getAccount } from "../../middleware/getAccountInfo";

export const userRouter = Router();
userRouter.put("/update-account-info", verifyJwt, accountUpdateController);
userRouter.get("/account-info", verifyJwt, getAccount, accountInfoController);
