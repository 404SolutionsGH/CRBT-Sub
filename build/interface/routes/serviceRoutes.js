"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = require("express");
const verifyJwt_1 = require("../../interface/middlewares/verifyJwt");
// import { newServiceController, subscribeServiceController, unsubscribeServiceController } from "../controllers/serviceController";
const checkForSuperAdmin_1 = require("../../interface/middlewares/checkForSuperAdmin");
const serviceController_1 = require("../controllers/serviceController");
exports.serviceRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/service/new-service:
 *   post:
 *     tags:
 *       - Service
 *     summary: Create a New Service
 *     description: This endpoint allows SuperAdmin accounts to create new services. Only SuperAdmin accounts can access this endpoint.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "merchant@example.com"
 *                 description: The email of the merchant requesting the service.
 *               planType:
 *                 type: string
 *                 enum: ["basic", "standard", "premium"]
 *                 example: "standard"
 *                 description: The subscription plan the merchant is choosing.
 *               category:
 *                 type: string
 *                 example: "eCommerce"
 *                 description: The category of the service being created.
 *               serviceName:
 *                 type: string
 *                 example: "Shopify Integration"
 *                 description: The name of the service being created.
 *     responses:
 *       201:
 *         description: Service created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service created successfully."
 *       400:
 *         description: Bad request. Missing or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No data passed for email."
 *       401:
 *         description: Unauthorized. The account does not have the required SuperAdmin access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This Account is not authorized to create a service."
 *       404:
 *         description: Not found. The account attempting to access this endpoint does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No admin account with this email exist"
 *       409:
 *         description: Conflict. The merchant already has a service associated with their account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This account is already associated with a service"
 */
exports.serviceRouter.post("/new-service", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, serviceController_1.newServiceController);
exports.serviceRouter.post("/subscribe", verifyJwt_1.verifyJwt, serviceController_1.subscribeServiceController);
// serviceRouter.post("/unsubscribe", verifyJwt, unsubscribeServiceController);
