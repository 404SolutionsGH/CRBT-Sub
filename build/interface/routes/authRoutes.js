"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const checkForSuperAdmin_1 = require("../middlewares/checkForSuperAdmin");
const verifyJwt_1 = require("../middlewares/verifyJwt");
exports.authRouter = (0, express_1.Router)();
// endpoint for creating account for users and mercahnts
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Account
 *     summary: Create a merchant account
 *     description: This is the endpoint for creating merchant accounts, which can only be accessed by the superAdmin. Requires an Auth header.
 *     security:
 *       - bearerAuth: []
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
exports.authRouter.post("/signup", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, authControllers_1.signUpController);
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
 *                     description: The prefered language of the user.
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
