import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { createPlanController, deleteAdminPlanController, getAdminPlanController, getAllPlansController, planSubcriptionController, updateAdminPlanController } from "../controllers/adminPlanControllers";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";
import { checkSystemStatus } from "../middlewares/checkSystemStatus";



export const adminPlanRouter= Router()

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
 *                 enum: ["monthly", "yearly","weekly"]
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
adminPlanRouter.post("/create",verifyJwt,isSuperAdminAccount,createPlanController)

/**
 * @swagger
 * /api/v1/admin-plan/single/{planId}:
 *   get:
 *     tags:
 *       - MerchantPlans
 *     summary: Get Details of a Single Merchant Plan
 *     description: This endpoint retrieves details about a specific merchant plan based on a valid plan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: planId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: A valid merchant plan ID.
 *     responses:
 *       200:
 *         description: Merchant plan details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan:
 *                   type: object
 *                   properties:
 *                     planId:
 *                       type: number
 *                       example: 1
 *                     planType:
 *                       type: string
 *                       example: "Basic"
 *                     price:
 *                       type: string
 *                       example: "99.99"
 *                     subType:
 *                       type: string
 *                       enum: ["monthly", "yearly"]
 *                       example: "monthly"
 *                     planName:
 *                       type: string
 *                       example: "Basic Plan"
 *                     benefits:
 *                       type: object
 *                       properties:
 *                         songLimit:
 *                           type: number
 *                           example: 100
 *                         subscriberLimit:
 *                           type: number
 *                           example: 5000
 *                         numberOfSongsPerUpload:
 *                           type: number
 *                           example: 10
 *                       description: Object containing the details of plan benefits.
 *                     deleteFlag:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating why the request was unsuccessful>"
 *       401:
 *         description: Unauthorized. The user does not have the required authority.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this plan."
 *       404:
 *         description: Plan not found. The plan with the provided ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Plan not found."
 */
adminPlanRouter.get("/single/:planId", verifyJwt,getAdminPlanController);

/**
 * @swagger
 * /api/v1/admin-plan/{planId}:
 *   put:
 *     tags:
 *       - MerchantPlans
 *     summary: Update a Merchant Plan
 *     description: This endpoint allows updating details of a merchant plan based on a valid plan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: planId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: A valid merchant plan ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planType:
 *                 type: string
 *                 example: "Premium"
 *               price:
 *                 type: string
 *                 example: "199.99"
 *               subType:
 *                 type: string
 *                 enum: ["monthly", "yearly"]
 *                 example: "yearly"
 *               benefits:
 *                 type: object
 *                 properties:
 *                   songLimit:
 *                     type: number
 *                     example: 500
 *                   subscriberLimit:
 *                     type: number
 *                     example: 10000
 *                   numberOfSongsPerUpload:
 *                     type: number
 *                     example: 50
 *     responses:
 *       200:
 *         description: Merchant plan updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Merchant plan updated successfully."
 *                 updatedPlan:
 *                   type: object
 *                   properties:
 *                     planId:
 *                       type: number
 *                       example: 2
 *                     planType:
 *                       type: string
 *                       example: "Premium"
 *                     price:
 *                       type: string
 *                       example: "199.99"
 *                     subType:
 *                       type: string
 *                       enum: ["monthly", "yearly"]
 *                       example: "yearly"
 *                     planName:
 *                       type: string
 *                       example: "Premium Plan"
 *                     benefits:
 *                       type: object
 *                       properties:
 *                         songLimit:
 *                           type: number
 *                           example: 500
 *                         subscriberLimit:
 *                           type: number
 *                           example: 10000
 *                         numberOfSongsPerUpload:
 *                           type: number
 *                           example: 50
 *                     deleteFlag:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating why the request was unsuccessful>"
 *       401:
 *         description: Unauthorized. The user does not have the required authority.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to update this plan."
 *       404:
 *         description: Plan not found. The plan with the provided ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Plan not found."
 */
adminPlanRouter.put("/:planId", verifyJwt, isSuperAdminAccount,updateAdminPlanController);

/**
 * @swagger
 * /api/v1/admin-plan/{planId}:
 *   delete:
 *     tags:
 *       - MerchantPlans
 *     summary: Delete a Merchant Plan
 *     description: This endpoint allows deleting a merchant plan based on a valid plan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: planId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: A valid merchant plan ID.
 *     responses:
 *       200:
 *         description: Merchant plan deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Merchant plan deleted successfully."
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "<Error message indicating why the request was unsuccessful>"
 *       401:
 *         description: Unauthorized. The user does not have the required authority to delete the plan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to delete this plan."
 *       404:
 *         description: Plan not found. The plan with the provided ID does not exist or it is flagged for deletion due to merchants still using it.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Plan not found or flagged for deletion."
 */
adminPlanRouter.delete("/:planId",verifyJwt,isSuperAdminAccount,deleteAdminPlanController)

/**
 * @swagger
 * /api/v1/admin-plan/all:
 *   get:
 *     tags:
 *       - MerchantPlans
 *     summary: Get all available merchant plans
 *     description: This is the endpoint for retrieving all merchant plans available 
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
adminPlanRouter.get("/all",checkSystemStatus,getAllPlansController)


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
adminPlanRouter.post("/subscribe/:planId",verifyJwt,planSubcriptionController)  