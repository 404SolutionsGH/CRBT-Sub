"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
exports.authRouter = (0, express_1.Router)();
// endpoint for creating account for users and mercahnts
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Account
 *     summary: Create a new account (User or Merchant)
 *     description: |
 *       This endpoint allows the creation of accounts for both users and merchants. The request body format depends on the type of account being created.
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
 *                     description: Preferred language (e.g., "eng").
 *               - type: object
 *                 required:
 *                   - accountType
 *                   - email
 *                   - firstName
 *                   - lastName
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
 *                   firstName:
 *                     type: string
 *                     description: First name of the merchant.
 *                   lastName:
 *                     type: string
 *                     description: Last name of the merchant.
 *                   password:
 *                     type: string
 *                     description: Password for the merchant's account.
 *     responses:
 *       201:
 *         description: Account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "<Message indicating the account has been created>"
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
 *         description: Conflict. Account with email or phone already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating conflict with existing account>"
 */
exports.authRouter.post("/signup", authControllers_1.signUpController);
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
 *                   - idFromFirebase
 *                 properties:
 *                   accountType:
 *                     type: string
 *                     enum: [user]
 *                     description: Indicates the account is for a user.
 *                   phone:
 *                     type: string
 *                     description: Must be a valid phone number in international format.
 *                   idFromFirebase:
 *                     type: string
 *                     description: JWT token from Firebase for authentication.
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
 *                   example: "<Message indicating login was successful>"
 *                 token:
 *                   type: string
 *                   example: "JwtTokenGeneratedByBackend"
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
exports.authRouter.post("/login", authControllers_1.loginController);
// // authRouter.post("/send-confirmationCode", checkingForAccount, sendConfirmationCodeController);
// authRouter.post("/admin/login", checkingForAccount, loginControllerForAdmins);
// authRouter.post("/login", checkingForAccount, loginController);
// authRouter.post("/confirm-account", checkingForAccount, accountConfirmationController);
// authRouter.post("/reset-account", checkingForAccount,resetAccountController);
