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
 * /api/v1/admin/package/:
 *   post:
 *     tags:
 *       - Admins
 *     summary: Create a new package
 *     description: This is the endpoint for superAdmins to create packages.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packageName:
 *                 type: string
 *                 example: Jumbobundle
 *                 description: The name of the package.
 *               packageDescription:
 *                 type: string
 *                 example: "This is a bundle for people looking for huge data packages."
 *                 description: Description of the package.
 *               packageImg:
 *                 type: string
 *                 example: "<Base64 string of the package image>"
 *                 description: Image of the package encoded as a Base64 string.
 *               packageType:
 *                 type: string
 *                 example: "2D"
 *                 description: The type of package (e.g., 2D for 2 days, 3W for 3 weeks, 6M for 6 months).
 *               ussdCode:
 *                 type: string
 *                 example: "*123*34#"
 *                 description: The USSD code associated with the package.
 *     responses:
 *       200:
 *         description: Package created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package created successfully."
 *       400:
 *         description: Bad request due to invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request data."
 *       401:
 *         description: Unauthorized access. Only superAdmins can create packages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       409:
 *         description: Conflict error if the package already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Package already exists."
 */
adminRouter.post("/package", verifyJwt, isSuperAdminAccount, createPackagesController);

/**
 * @swagger
 * /api/v1/admin/package/{id}:
 *   put:
 *     tags:
 *       - Admins
 *     summary: Update an existing package
 *     description: This is the endpoint for superAdmins to update packages.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packageName:
 *                 type: string
 *                 example: Jumbobundle
 *                 description: The name of the package.
 *               packageDescription:
 *                 type: string
 *                 example: "This is a bundle for people looking for huge data packages."
 *                 description: Description of the package.
 *               packageImg:
 *                 type: string
 *                 example: "/9j/4AAQSkZJRgABAQAAAQABAAD/4QB9RXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAAAEAAAAAAAABAAEAAAABAAMAAAABAAEAAAEBAAMAAAABAAEAAAAAAAD/2wBDAP////////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAAmACkDASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAAECAwQFBgcI/8QAKhAAAgIBAwIFAwQCAwEAAAAAAQIDBBEFBhIhMVETIoEUQnGBIzJCU5KhscHwYpLh8Qf/."
 *                 description: Image of the package encoded as a Base64 string.
 *               packageType:
 *                 type: string
 *                 example: "2D"
 *                 description: The type of package (e.g., 2D for 2 days, 3W for 3 weeks, 6M for 6 months).
 *               ussdCode:
 *                 type: string
 *                 example: "*123*34#"
 *                 description: The USSD code associated with the package.
 *     responses:
 *       200:
 *         description: Package updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package updated successfully."
 *       400:
 *         description: Bad request due to invalid input or missing package ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request data or package ID."
 *       401:
 *         description: Unauthorized access. Only superAdmins can update packages.
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
