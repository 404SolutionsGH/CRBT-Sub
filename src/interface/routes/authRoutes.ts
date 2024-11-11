import { Router } from "express";
import { loginController, signUpController } from "../controllers/authControllers";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";
import { verifyJwt } from "../middlewares/verifyJwt";
import { checkSystemStatus } from "../middlewares/checkSystemStatus";

export const authRouter = Router();

// endpoint for creating account  mercahnts

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Account
 *     summary: Create a merchant account
 *     description: This is the endpoint for creating merchant accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - accountType
 *               - password
 *               - firstName
 *               - lastName
 *               - planId
 *             properties:
 *               email:
 *                 type: string
 *                 example: "merchant@example.com"
 *               accountType:
 *                 type: string
 *                 enum: [admin]
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               planId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Admin account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin account created successfully"
 *       400:
 *         description: Bad request. The request is malformed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 *       401:
 *         description: Unauthorized. The client is not authorized to create an admin account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 *       404:
 *         description: Plan or account not found. Either the plan ID does not exist or the client account doesn't exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 *       409:
 *         description: Conflict. Merchant account already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Merchant account already exists"
 */
authRouter.post("/signup", checkSystemStatus,signUpController);


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Account
 *     summary: Login for Users or Merchants
 *     description: |
 *       This endpoint allows users or merchants to log into their accounts. The request body format differs based on the type of account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - accountType
 *                   - phone
 *                   - langPref
 *                 properties:
 *                   accountType:
 *                     type: string
 *                     enum: [user]
 *                     description: Indicates the account is for a user.
 *                   phone:
 *                     type: string
 *                     description: Must be a valid phone number in international format.
 *                   langPref:
 *                     type: string
 *                     description: The preferred language of the user.
 *               - type: object
 *                 required:
 *                   - accountType
 *                   - email
 *                   - password
 *                 properties:
 *                   accountType:
 *                     type: string
 *                     enum: [admin]
 *                     description: Indicates the account is for a merchant (admin).
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Must be a valid email address.
 *                   password:
 *                     type: string
 *                     description: Password for the merchant's account.
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 account:
 *                   type: object
 *                   properties:
 *                     accountBalance:
 *                       type: string
 *                       example: "0.00"
 *                     subSongId:
 *                       type: integer
 *                       example: 0
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     phone:
 *                       type: string
 *                       example: "+2335033887"
 *                     langPref:
 *                       type: string
 *                       example: "English"
 *                     firstName:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     lastName:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzI5NzA5MjM5LCJleHAiOjE3MzE0MzcyMzl9.cpE-BOqp32bT3Is6_mQ-SYfg5kIeN_KGJrtDN-mII8g"
 *       400:
 *         description: Bad request. Invalid or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating why the request was unsuccessful>"
 *       409:
 *         description: Conflict. Account with provided credentials already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating conflict with existing account>"
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 */
authRouter.post("/login",  loginController);

// // authRouter.post("/send-confirmationCode", checkingForAccount, sendConfirmationCodeController);
// authRouter.post("/admin/login", checkingForAccount, loginControllerForAdmins);
// authRouter.post("/login", checkingForAccount, loginController);
// authRouter.post("/confirm-account", checkingForAccount, accountConfirmationController);
// authRouter.post("/reset-account", checkingForAccount,resetAccountController);
