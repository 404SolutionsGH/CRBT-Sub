import { Router } from "express";

// import { accountInfoController, accountUpdateController } from "../controllers/userControllers";
import { verifyJwt } from "../middlewares/verifyJwt";
import { accountInfoController, accountUpdateController, getUserContactsController, saveUserContactsController } from "../controllers/userControllers";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";

export const userRouter = Router();


/**
 * @swagger
 * /api/v1/user/user-contacts:
 *   post:
 *     tags:
 *       - Account
 *     summary: Endpoint for saving user's contacts
 *     description: This endpoint allows users to save their contact information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["+1234567890", "+0987654321"]
 *     responses:
 *       201:
 *         description: Contacts saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contacts saved"
 *       400:
 *         description: Bad request. Contacts must be an array, or no value was provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input: 'contacts' must be an array of strings."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while saving contacts."
 */
userRouter.post("/user-contacts", verifyJwt, saveUserContactsController);


/**
 * @swagger
 * /api/v1/user/user-contacts:
 *   get:
 *     tags:
 *       - Account
 *     summary: Endpoint for SuperAdmin to retrieve user contacts
 *     description: This endpoint allows SuperAdmins to fetch user contact information with pagination.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 1
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contacts:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["+23350345773", "+2334059389959"]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-19T15:51:21.352Z"
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request. Page or size value is not a valid integer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input: 'page' and 'size' must be integers."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving contacts."
 */
userRouter.get("/user-contacts", verifyJwt, isSuperAdminAccount, getUserContactsController);


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
 *               profile:
 *                 type: string
 *                 nullable: true
 *                 description: "Base64 string of the profile image. Can be null."
 *                 example: null
 *               location:
 *                 type: string
 *                 nullable: true
 *                 description: "User's location. Can be null."
 *                 example: "New York, USA"
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
 *                     profile:
 *                       type: string
 *                       nullable: true
 *                       description: "Base64 string of the profile image. Can be null."
 *                       example: "data:image/png;base64,iVBORw0..."
 *                     location:
 *                       type: string
 *                       nullable: true
 *                       description: "User's location. Can be null."
 *                       example: "New York, USA"
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
 *                       example: "https://api.crbtmusicpro.com/api/v1/songs/profile/PVTlS8u2jTZv6CwqxLBm.jpeg"
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
