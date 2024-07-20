import { Router } from "express";
import { checkingForAccount } from "../../middleware/checkAccountExistence";
import { accountUpdateControler } from "./userControllers";
import { verifyJwt } from "../../middleware/verifyJwt";


export const userRouter = Router();


userRouter.put("/update-account-info",verifyJwt,accountUpdateControler)