import { Router } from "express";
import { accountConfirmationController, loginController, resetAccountController, sendConfirmationCodeController, signUpController } from "./authControllers";
import { checkingForAccount } from "../../middleware/checkAccountExistence";

export const authRouter = Router();

authRouter.post("/signup", checkingForAccount, signUpController);
authRouter.post("/send-confirmationCode", sendConfirmationCodeController);
authRouter.post("/login", loginController);
authRouter.post("/confirm-account", accountConfirmationController);
authRouter.post("/reset-account", resetAccountController);
