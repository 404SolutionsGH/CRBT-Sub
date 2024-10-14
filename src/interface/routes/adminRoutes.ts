import { Router } from "express";
import { createPackagesController, deletePackagesController, getMerchantsController, getUsersController, updatePackagesController } from "../controllers/adminControllers";
import { verifyJwt } from "../middlewares/verifyJwt";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";


export const adminRouter = Router();

/**
 * @swagger
 * /api/v1/admin/users/{type}:
 *   get:
 *     tags:
 *       - Admins
 *     summary: Get all users or subscribed users
 *     description: This is the endpoint for getting all users in the system (for superAdmin only) or users who have subscribed or unsubsrcibed to a particular merchant's song.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, sub, unSub]
 *         required: true
 *         description: Specify 'all' to get all users or 'sub' to get subscribed users.
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: List of user data
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request or missing parameters."
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access. Only superAdmins can get all users."
 */
adminRouter.get("/users/:type", verifyJwt,isSuperAdminAccount,getUsersController);

/**
 * @swagger
 * /api/v1/admin/merchants/{cat}:
 *   get:
 *     tags:
 *       - Admins
 *     summary: Get all merchants or subscribed merchants
 *     description: This is the endpoint for getting all merchants in the system (for superAdmin only) or merchants who have subscribed or unsubscribed to a particular plan.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cat
 *         schema:
 *           type: string
 *           enum: [all, sub, unSub]
 *         required: true
 *         description: Specify 'all' to get all merchants or 'sub' to get merchants subscribed to a plan.
 *     responses:
 *       200:
 *         description: List of merchants retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 merchants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: List of merchant data
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request or missing parameters."
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access. Only superAdmins can get all merchants."
 */
adminRouter.get("/merchants/:cat",verifyJwt,isSuperAdminAccount,getMerchantsController)



adminRouter.post("/package",verifyJwt,isSuperAdminAccount,createPackagesController)

adminRouter.put("/package/:id",verifyJwt,isSuperAdminAccount,updatePackagesController)

adminRouter.delete("/package/:id",verifyJwt,isSuperAdminAccount,deletePackagesController)

