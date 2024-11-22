import { Router } from "express";

// import { accountInfoController, accountUpdateController } from "../controllers/userControllers";
import { verifyJwt } from "../middlewares/verifyJwt";
import { accountInfoController, accountUpdateController } from "../controllers/userControllers";

export const userRouter = Router();

/**
 * @swagger
 * /api/v1/user/update-account-info:
 *   put:
 *     tags:
 *       - Account
 *     summary: Update User Account Information
 *     description: This endpoint allows users to update information about their account.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               accountBalance:
 *                 type: string
 *                 example: "1000.00"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               langPref:
 *                 type: string
 *                 example: "eng"
 *     responses:
 *       200:
 *         description: Account information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account information updated successfully."
 *                 updatedAccount:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     accountBalance:
 *                       type: string
 *                       example: "1000.00"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     langPref:
 *                       type: string
 *                       example: "eng"
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating why the request was unsuccessful>"
 *       401:
 *         description: Unauthorized. Invalid or missing JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access. Invalid token."
 */
userRouter.put("/update-account-info", verifyJwt, accountUpdateController);



/**
 * @swagger
 * /api/v1/user/account-info:
 *   get:
 *     tags:
 *       - Account
 *     summary: Retrieve User Account Information
 *     description: This endpoint retrieves information about a user account. It requires an authentication token in the request header.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 accountBalance:
 *                   type: string
 *                   example: "0.00"
 *                 phone:
 *                   type: string
 *                   example: "+233503747733"
 *                 langPref:
 *                   type: string
 *                   example: "English"
 *                 rewardPoints:
 *                   type: number
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-22T02:16:32.012Z"
 *                 subSongDetails:
 *                   type: object
 *                   properties:
 *                     artisteName:
 *                       type: string
 *                       example: "The Weeknd"
 *                     songTitle:
 *                       type: string
 *                       example: "Blinding Lights"
 *                     subscriptionType:
 *                       type: string
 *                       example: "weekly"
 *                     price:
 *                       type: string
 *                       example: "2"
 *                     profile:
 *                       type: string
 *                       format: uri
 *                       example: "https://crbtbackend.trotro.live/api/v1/songs/profile/PVTlS8u2jTZv6CwqxLBm.jpeg"
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating why the request was unsuccessful>"
 *       401:
 *         description: Unauthorized. Invalid or missing JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access. Invalid token."
 */
userRouter.get("/account-info", verifyJwt, accountInfoController);


