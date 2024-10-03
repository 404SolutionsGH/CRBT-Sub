"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPlanRouter = void 0;
const express_1 = require("express");
const verifyJwt_1 = require("../middlewares/verifyJwt");
const adminPlanControllers_1 = require("../controllers/adminPlanControllers");
const checkForSuperAdmin_1 = require("../middlewares/checkForSuperAdmin");
exports.adminPlanRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/admin-plan/create:
 *   post:
 *     tags:
 *       - MerchantPlans
 *     summary: Create a new merchant plan
 *     description: This is the endpoint for superAdmins to create merchant plans.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planType
 *               - price
 *               - subType
 *               - benefits
 *             properties:
 *               planType:
 *                 type: string
 *                 example: "premium"
 *               price:
 *                 type: string
 *                 example: "99.99"
 *               subType:
 *                 type: string
 *                 enum: ["monthly", "yearly"]
 *                 example: "monthly"
 *               benefits:
 *                 type: object
 *                 properties:
 *                   songLimit:
 *                     type: integer
 *                     example: 1000
 *                   subscriberLimit:
 *                     type: integer
 *                     example: 500
 *                   numberOfSongsPerUpload:
 *                     type: integer
 *                     example: 10
 *     responses:
 *       200:
 *         description: Plan has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plan has been created successfully"
 *       400:
 *         description: Bad request. One or more required fields are missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 *       401:
 *         description: Unauthorized. The client is not authorized to create a plan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 *       409:
 *         description: Conflict. The plan being created already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 */
exports.adminPlanRouter.post("/create", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, adminPlanControllers_1.createPlanController);
/**
 * @swagger
 * /api/v1/admin-plan/all:
 *   get:
 *     tags:
 *       - MerchantPlans
 *     summary: Get all available merchant plans
 *     description: This is the endpoint for retrieving all merchant plans available. Requires an Auth header.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all available merchant plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allPlans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       planType:
 *                         type: string
 *                         example: "premium"
 *                       price:
 *                         type: string
 *                         example: "99.99"
 *                       subType:
 *                         type: string
 *                         example: "monthly"
 *                       benefits:
 *                         type: object
 *                         properties:
 *                           songLimit:
 *                             type: integer
 *                             example: 1000
 *                           subscriberLimit:
 *                             type: integer
 *                             example: 500
 *                           numberOfSongsPerUpload:
 *                             type: integer
 *                             example: 10
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
 *         description: Unauthorized. The client is not authorized to retrieve plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 */
exports.adminPlanRouter.get("/all", verifyJwt_1.verifyJwt, adminPlanControllers_1.getAllPlansController);
/**
 * @swagger
 * /api/v1/admin-plan/subscribe/{planId}:
 *   post:
 *     tags:
 *       - MerchantPlans
 *     summary: Subscribe to a merchant plan
 *     description: This is the endpoint for a merchant to subscribe to a plan. Requires an Auth header.
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the plan to subscribe to.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Subscription successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscription successful"
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
 *       404:
 *         description: Plan or merchant account not found. Either the plan ID does not exist or the client account doesn't exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Message indicating why the request failed>"
 */
exports.adminPlanRouter.post("/subscribe/:planId", verifyJwt_1.verifyJwt, adminPlanControllers_1.planSubcriptionController); // bug here (when a valid user subscribes we get 404 response saying the user does not exist) 
