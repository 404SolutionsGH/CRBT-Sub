import { Router } from "express";
import { accountConfirmationController, loginController, resetAccountController, sendConfirmationCodeController, signUpController } from "./authControllers";
import { checkingForAccount } from "../../middleware/checkAccountExistence";

export const authRouter = Router();

authRouter.post("/signup", checkingForAccount, signUpController);
authRouter.post("/send-confirmationCode", checkingForAccount, sendConfirmationCodeController);
authRouter.post("/login",checkingForAccount ,loginController);
authRouter.post("/confirm-account", checkingForAccount, accountConfirmationController);
authRouter.post("/reset-account", checkingForAccount,resetAccountController);
