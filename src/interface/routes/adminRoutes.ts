import { Router } from "express";
import {
  changePasswordController,
  createAdminAccountController,
  createPackageCategoriesController,
  createPackagesController,
  delePackageCategoriesController,
  deleteMerchnatsController,
  deletePackagesController,
  deleteUsersController,
  getAdminAccountInfoController,
  getMerchantsController,
  getPointsInfoController,
  getSystemAdminsController,
  getUsersController,
  updateAccountBySuperAdminController,
  updateAdminAccountInfoController,
  updatePackageCategoriesController,
  updatePackagesController,
} from "../controllers/adminControllers";
import { verifyJwt } from "../middlewares/verifyJwt";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";

export const adminRouter = Router();



/**
 * @swagger
 * /api/v1/admin/create/admin-account:
 *   post:
 *     tags:
 *       - Admins
 *     summary: Create a merchant and system admins account
 *     description: This is the endpoint for creating merchant accounts, which can only be accessed by the superAdmin. Requires an Auth header.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - accountType
 *                   - email
 *                   - password
 *                   - firstName
 *                   - lastName
 *                   - planId
 *                 properties:
 *                   accountType:
 *                     type: string
 *                     enum: [merchant]
 *                     description: Indicates the account type.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Must be a valid email address.
 *                   firstName:
 *                     type: string
 *                     example: "Alberth"
 *                   lastName:
 *                     type: string
 *                     example: "Arthur"
 *                   planId:
 *                     type: integer
 *                     example: 2  
 *               - type: object
 *                 required:
 *                   - accountType
 *                   - email
 *                   - password
 *                   - firstName
 *                   - lastName
 *                   - role
 *                 properties:
 *                   accountType:
 *                     type: string
 *                     enum: [system]
 *                     description: Indicates the account type.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Must be a valid email address.
 *                   firstName:
 *                     type: string
 *                     example: "Alberth"
 *                   lastName:
 *                     type: string
 *                     example: "Arthur"
 *                   role:
 *                     type: string
 *                     example: "UserManager"
 *                     description: Must be a valid role name in the system.  
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
adminRouter.post("/create/admin-account", verifyJwt, isSuperAdminAccount, createAdminAccountController);

/**
 * @swagger
 * /api/v1/admin/account-info:
 *   get:
 *     tags:
 *       - Account
 *     summary: Get SuperAdmin and Merchant Account Info
 *     description: This endpoint retrieves the account information for SuperAdmins and Merchants.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 adminType:
 *                   type: string
 *                   example: "SuperAdmin"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "admin@example.com"
 *                 nextSubPayment:
 *                   type: string
 *                   example: "2024-12-01"
 *                 rewardPoints:
 *                   type: number
 *                   example: 50
 *                 subPlanDetails:
 *                   type: object
 *                   properties:
 *                     planId:
 *                       type: number
 *                       example: 123
 *                     planType:
 *                       type: string
 *                       example: "Premium"
 *                     price:
 *                       type: string
 *                       example: "100.00"
 *                     subType:
 *                       type: string
 *                       enum: ["monthly", "yearly"]
 *                       example: "monthly"
 *                     planName:
 *                       type: string
 *                       example: "Gold Plan"
 *                     benefits:
 *                       type: object
 *                       description: "An object listing the benefits of the plan"
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
 *       404:
 *         description: Account not found. The account does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found."
 */
adminRouter.get("/account-info",verifyJwt,getAdminAccountInfoController)


/**
 * @swagger
 * /api/v1/admin/account-info:
 *   put:
 *     tags:
 *       - Account
 *     summary: Update SuperAdmin and Merchant Account Info
 *     description: This endpoint allows SuperAdmins and Merchants to update their account information.
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
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               profile:
 *                 type: string
 *                 nullable: true
 *                 description: "Base64 string of the profile image. Can be null."
 *                 example: null
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
 *                 updatedData:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     profile:
 *                       type: string
 *                       nullable: true
 *                       description: "Base64 string of the profile image. Can be null."
 *                       example: "data:image/png;base64,iVBORw0..."
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
 *       404:
 *         description: Account not found. The account does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found."
 */
adminRouter.put("/account-info",verifyJwt,updateAdminAccountInfoController)


/**
 * @swagger
 * /api/v1/admin/account-info/{adminType}/{adminId}:
 *   put:
 *     tags:
 *       - Admins
 *     summary: Edit System Admins and Merchant Accounts
 *     description: This endpoint allows SuperAdmins to edit the account information of other system administrators and merchants.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminType
 *         schema:
 *           type: string
 *           enum: [merchant, system]
 *         required: true
 *         description: Specify the type of admin account to edit ('merchant' or 'system').
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin account to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             oneOf:
 *               - description: Request body for editing merchant accounts
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "merchant@example.com"
 *                   planId:
 *                     type: number
 *                     example: 123
 *               - description: Request body for editing system admin accounts
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: "Alice"
 *                   lastName:
 *                     type: string
 *                     example: "Smith"
 *                   email:
 *                     type: string
 *                     example: "admin@example.com"
 *                   role:
 *                     type: string
 *                     example: "SuperAdmin"
 *     responses:
 *       200:
 *         description: Account updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account updated successfully."
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
 *       404:
 *         description: Account not found. The account does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found."
 */
adminRouter.put("/account-info/:adminType/:adminId",verifyJwt,isSuperAdminAccount,updateAccountBySuperAdminController)



/**
 * @swagger
 * /api/v1/admin/password-change:
 *   put:
 *     tags:
 *       - Account
 *     summary: Change Account Password for SuperAdmin and Merchants
 *     description: This endpoint allows SuperAdmins and Merchants to change their account password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "NewStrongPassword123!"
 *               oldPassword:
 *                 type: string
 *                 example: "CurrentPassword"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully."
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
 *         description: Unauthorized. Old password does not match.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Old password does not match."
 *       404:
 *         description: Account not found. The account does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found."
 */
adminRouter.put("/password-change", verifyJwt, changePasswordController);
// adminRouter.put("/account-reset",verifyJwt,)


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
 * /api/v1/admin/system:
 *   get:
 *     tags:
 *       - Admins
 *     summary: Get all system administrators
 *     description: This is the endpoint for retrieving all system administrators (SuperAdmin and other admin roles) in the system.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of system administrators retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admins:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: List of administrator data
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         example: "admin@example.com"
 *                       role:
 *                         type: string
 *                         example: "SuperAdmin"
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
 *                   example: "Unauthorized access. Only superAdmins can retrieve system administrators."
 */
adminRouter.get("/system", verifyJwt, isSuperAdminAccount, getSystemAdminsController);


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
 *               packageCatId:
 *                 type: number
 *                 description: A valid package category ID.
 *               price:
 *                 type: string
 *                 description: price to be paid to get the package.
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
 *               packageCatId:
 *                 type: number
 *                 description: A valid package category ID.
 *               price:
 *                 type: string
 *                 description: price to be paid to get the package.
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


/**
 * @swagger
 * /api/v1/admin/package-category:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admins
 *     summary: Create a package category
 *     description: This is the endpoint for superAdmins to create a package category. Requires an authentication header and a request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the package category.
 *               description:
 *                 type: string
 *                 description: A brief description of the package category.
 *     responses:
 *       201:
 *         description: Package category successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package category created successfully.
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
 *                   example: You must be a superAdmin to create a package category.
 *       409:
 *         description: Conflict. The package category already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: The package category with this title already exists.
 */
adminRouter.post("/package-category", verifyJwt, isSuperAdminAccount, createPackageCategoriesController);


/**
 * @swagger
 * /api/v1/admin/package-category/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admins
 *     summary: Update a package category
 *     description: This is the endpoint for superAdmins to update a package category. Requires a valid package category ID in the URL path, authentication header, and request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package category to update (must be a valid package category ID).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the package category.
 *               description:
 *                 type: string
 *                 description: The updated description of the package category.
 *     responses:
 *       200:
 *         description: Package category successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package category updated successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request body or package category ID.
 *       401:
 *         description: Unauthorized. Only superAdmins can perform this action.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You must be a superAdmin to update a package category.
 *       404:
 *         description: Package category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No package category found with the provided ID.
 */
adminRouter.put("/package-category/:id", verifyJwt, isSuperAdminAccount, updatePackageCategoriesController);


/**
 * @swagger
 * /api/v1/admin/package-category/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admins
 *     summary: Delete a package category
 *     description: This is the endpoint for superAdmins to delete a package category and all associated packages. Requires a valid package category ID in the URL path and an authentication header.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package category to delete (must be a valid package category ID).
 *     responses:
 *       200:
 *         description: Package category successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package category deleted successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request body or package category ID.
 *       401:
 *         description: Unauthorized. Only superAdmins can perform this action.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You must be a superAdmin to delete this package category.
 *       404:
 *         description: Package category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No package category found with the provided ID.
 */
adminRouter.delete("/package-category/:id", verifyJwt, isSuperAdminAccount, delePackageCategoriesController);


/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   delete:
 *     tags:
 *       - Admins
 *     summary: Delete a user account
 *     description: This is the endpoint for deleting a user account. A valid authorization header with a JWT token is required.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID of the user account to delete.
 *     responses:
 *       204:
 *         description: User account deleted successfully.
 *       400:
 *         description: Bad request. The provided account ID is not a number.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The provided ID must be a number."
 *       401:
 *         description: Unauthorized. The client does not have permission to delete the account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Client is not authorized to delete this account."
 *       404:
 *         description: Not found. The account to be deleted does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The account with the provided ID does not exist."
 */
adminRouter.delete("/user/:id",verifyJwt,isSuperAdminAccount,deleteUsersController)


/**
 * @swagger
 * /api/v1/admin/merchant/{id}:
 *   delete:
 *     tags:
 *       - Admins
 *     summary: Delete a merchant account
 *     description: This endpoint allows an admin to delete a merchant account. A valid authorization header with a JWT token is required.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID of the merchant account to delete.
 *     responses:
 *       204:
 *         description: Merchant account deleted successfully.
 *       400:
 *         description: Bad request. The provided account ID is not a number.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The provided ID must be a number."
 *       401:
 *         description: Unauthorized. The client does not have permission to delete the account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Client is not authorized to delete this account."
 *       404:
 *         description: Not found. The merchant account to be deleted does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The merchant account with the provided ID does not exist."
 */
adminRouter.delete("/merchant/:id", verifyJwt, isSuperAdminAccount,deleteMerchnatsController)


/**
 * @swagger
 * /api/v1/admin/rewards/{accountType}:
 *   get:
 *     tags:
 *       - Admins
 *     summary: Retrieve points information for accounts
 *     description: This endpoint allows admins to retrieve the points information for each account based on their type (either "user" or "admin").
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountType
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["user", "admin"]
 *         description: Type of account to retrieve points for, either "user" or "admin".
 *     responses:
 *       200:
 *         description: Successfully retrieved points information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   accountId:
 *                     type: number
 *                     description: Unique identifier of the account.
 *                   accountType:
 *                     type: string
 *                     description: Type of the account (user or admin).
 *                   points:
 *                     type: number
 *                     description: Number of points accumulated by the account.
 *                   email:
 *                     type: string
 *                     description: Email associated with the account.
 *                   phone:
 *                     type: string
 *                     description: Phone number associated with the account.
 *       400:
 *         description: Bad request. The provided accountType value is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid accountType provided."
 *       401:
 *         description: Unauthorized. Client is not authorized to access reward information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to view rewards information."
 */
adminRouter.get("/rewards/:accountType", verifyJwt, isSuperAdminAccount, getPointsInfoController);




