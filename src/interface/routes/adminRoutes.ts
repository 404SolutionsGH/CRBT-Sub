import { Router } from "express";
import {
  createPackageCategoriesController,
  createPackagesController,
  delePackageCategoriesController,
  deletePackagesController,
  getMerchantsController,
  getUsersController,
  updatePackageCategoriesController,
  updatePackagesController,
} from "../controllers/adminControllers";
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
adminRouter.get("/users/:type", verifyJwt, isSuperAdminAccount, getUsersController);

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
adminRouter.get("/merchants/:cat", verifyJwt, isSuperAdminAccount, getMerchantsController);

/**
 * @swagger
 * /api/v1/admin/package:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admins
 *     summary: Create a package
 *     description: This endpoint allows superAdmins to create new packages. Requires an authentication header and a request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packageName:
 *                 type: string
 *                 description: The name of the package.
 *               packageDescription:
 *                 type: string
 *                 description: A brief description of the package.
 *               packageImg:
 *                 type: string
 *                 nullable: true
 *                 description: A Base64 string representing the package image (optional).
 *               packageType:
 *                 type: string
 *                 enum: [any, voice, sms, data]
 *                 description: The type of package.
 *               ussdCode:
 *                 type: string
 *                 description: The USSD code associated with the package.
 *               packageValidity:
 *                 type: string
 *                 description: The validity period of the package (e.g., 1D for 1 day, 2W for 2 weeks, 3M for 3 months, 0I for non-expiry).
 *     responses:
 *       201:
 *         description: Package successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package created successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request body.
 *       401:
 *         description: Unauthorized. Only superAdmins can perform this action.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You must be a superAdmin to create a package.
 *       409:
 *         description: Conflict. The package already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: The package with this name already exists.
 */
adminRouter.post("/package", verifyJwt, isSuperAdminAccount, createPackagesController);

/**
 * @swagger
 * /api/v1/admin/package/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admins
 *     summary: Update a package
 *     description: This endpoint allows superAdmins to update packages. Requires a valid package ID in the URL path, authentication header, and request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package to update (must be a valid package ID).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packageName:
 *                 type: string
 *                 description: The name of the package.
 *               packageDescription:
 *                 type: string
 *                 description: A brief description of the package.
 *               packageImg:
 *                 type: string
 *                 nullable: true
 *                 description: A Base64 string representing the package image (optional).
 *               packageType:
 *                 type: string
 *                 enum: [any, voice, sms, data]
 *                 description: The type of package.
 *               ussdCode:
 *                 type: string
 *                 description: The USSD code associated with the package.
 *               packageValidity:
 *                 type: string
 *                 description: The validity period of the package (e.g., 1D for 1 day, 2W for 2 weeks, 3M for 3 months, 0I for non-expiry).
 *     responses:
 *       200:
 *         description: Package successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package updated successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid package ID or request body.
 *       401:
 *         description: Unauthorized. Only superAdmins can perform this action.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You must be a superAdmin to update this package.
 *       404:
 *         description: Package not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No package found with the provided ID.
 */
adminRouter.put("/package/:id", verifyJwt, isSuperAdminAccount, updatePackagesController);

/**
 * @swagger
 * /api/v1/admin/package/{id}:
 *   delete:
 *     tags:
 *       - Admins
 *     summary: Delete an existing package
 *     description: This is the endpoint for superAdmins to delete packages.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package to delete.
 *     responses:
 *       200:
 *         description: Package deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package deleted successfully."
 *       400:
 *         description: Invalid request due to missing or incorrect package ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid package ID."
 *       401:
 *         description: Unauthorized access. Only superAdmins can delete packages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       404:
 *         description: Package not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No package with the provided ID exists."
 */
adminRouter.delete("/package/:id", verifyJwt, isSuperAdminAccount, deletePackagesController);

adminRouter.post("/package-category", verifyJwt, isSuperAdminAccount, createPackageCategoriesController);
adminRouter.put("/package-category/:id", verifyJwt, isSuperAdminAccount, updatePackageCategoriesController);
adminRouter.delete("/package-category/:id", verifyJwt, isSuperAdminAccount, delePackageCategoriesController);
