import { Router } from "express";
import { loginController, signUpController } from "../controllers/authControllers";

export const authRouter = Router();

// endpoint for creating account for users and mercahnts
authRouter.post("/signup", signUpController);
authRouter.post("/login",  loginController);
// // authRouter.post("/send-confirmationCode", checkingForAccount, sendConfirmationCodeController);
// authRouter.post("/admin/login", checkingForAccount, loginControllerForAdmins);
// authRouter.post("/login", checkingForAccount, loginController);
// authRouter.post("/confirm-account", checkingForAccount, accountConfirmationController);
// authRouter.post("/reset-account", checkingForAccount,resetAccountController);
