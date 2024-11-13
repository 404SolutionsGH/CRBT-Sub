"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemRouter = void 0;
const express_1 = require("express");
const verifyJwt_1 = require("../middlewares/verifyJwt");
const checkForSuperAdmin_1 = require("../middlewares/checkForSuperAdmin");
const systemController_1 = require("../controllers/systemController");
exports.systemRouter = (0, express_1.Router)();
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
exports.systemRouter.put("/status", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, systemController_1.systemStatusController);
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
exports.systemRouter.put("/chapa-secret-key", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, systemController_1.chapaSecretController);
exports.systemRouter.put("/points/settings", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, systemController_1.pointSettingsController);
exports.systemRouter.get("/", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, systemController_1.systemInfoController);
