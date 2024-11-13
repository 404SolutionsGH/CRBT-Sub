import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";
import { chapaSecretController, pointSettingsController, systemInfoController, systemStatusController } from "../controllers/systemController";



export const systemRouter= Router()

/**
 * @swagger
 * /api/v1/system/status:
 *   put:
 *     tags:
 *       - Admins
 *     summary: Set or update the system status
 *     description: This endpoint allows an admin to set or update the system status to either "Active" or "Maintainance".
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Active", "Maintainance"]
 *                 description: The system status to set.
 *     responses:
 *       200:
 *         description: System status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "System updated successfully"
 *       400:
 *         description: Invalid status value; should be either "Active" or "Maintenance".
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid status value"
 *       401:
 *         description: Unauthorized. The client is not authorized to update the system status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to update system status."
 */
systemRouter.put("/status",verifyJwt,isSuperAdminAccount,systemStatusController)

/**
 * @swagger
 * /api/v1/system/chapa-secret-key:
 *   put:
 *     tags:
 *       - Admins
 *     summary: Set or update the Chapa secret key
 *     description: This endpoint allows an admin to set or update the Chapa secret key, which is the payment gateway key for this system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               secretKey:
 *                 type: string
 *                 description: The Chapa secret key for payment gateway integration.
 *     responses:
 *       200:
 *         description: Chapa secret key updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "System updated successfully"
 *       401:
 *         description: Unauthorized. The client is not authorized to update the Chapa secret key.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to update system information."
 */
systemRouter.put("/chapa-secret-key",verifyJwt,isSuperAdminAccount,chapaSecretController)

/**
 * @swagger
 * /api/v1/system/points/settings:
 *   put:
 *     tags:
 *       - Admins
 *     summary: Set points for rewarding users during song subscriptions
 *     description: This endpoint allows admins to configure the point allocation for users as rewards for song subscriptions, including a minimum withdrawal threshold.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songPoints:
 *                 type: number
 *                 description: Points awarded to users for each song subscription.
 *                 example: 5
 *               minimumWithdraw:
 *                 type: number
 *                 description: Minimum points required for users to make a withdrawal.
 *                 example: 100
 *     responses:
 *       200:
 *         description: Points settings updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data updated successfully"
 *       400:
 *         description: Bad request. Invalid input data provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized. Client is not authorized to update point settings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to update point settings."
 */
systemRouter.put("/points/settings", verifyJwt, isSuperAdminAccount, pointSettingsController);

/**
 * @swagger
 * /api/v1/system:
 *   get:
 *     tags:
 *       - Admins
 *     summary: Retrieve system information
 *     description: This endpoint provides information about the system, including the Chapa secret key, system status, and point settings.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 systemInfo:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "Active"
 *                     chapaSecretKey:
 *                       type: string
 *                       example: "CHASECK_TEST-t0ryiQDK2IcNKDhfGCyHDDXrtN5cUDzS"
 *                     pointSettings:
 *                       type: object
 *                       properties:
 *                         songPoints:
 *                           type: number
 *                           example: 2
 *                         minimumWithdraw:
 *                           type: number
 *                           example: 100
 *       401:
 *         description: Unauthorized. Client is not authorized to access system information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to access system information."
 */
systemRouter.get("/",verifyJwt,isSuperAdminAccount,systemInfoController)


