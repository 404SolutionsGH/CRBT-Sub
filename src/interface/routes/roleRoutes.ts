import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { createRoleController, deleteRoleController, getAllRolesController, getRoleController, updateRoleController } from "../controllers/roleControllers";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";

export const roleRouter = Router();

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a new role
 *     description: This endpoint is used to create new roles for the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role to be created.
 *                 example: "UserManager"
 *               allowedPages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Packages", "UserManagement", "Rewards", "Dashboard", "Payments", "Uploads", "SubscriptionPlans", "CRBTAds"]
 *                 description: List of pages the role is allowed to access.
 *                 example: ["Dashboard", "UserManagement"]
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role created successfully."
 *       400:
 *         description: Bad request. Missing or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized. The client is not authorized to create roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to create roles."
 *       409:
 *         description: Conflict. The role you want to create already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role already exists."
 */
roleRouter.post("/", verifyJwt, isSuperAdminAccount, createRoleController);

/**
 * @swagger
 * /api/v1/roles:
 *   put:
 *     tags:
 *       - Roles
 *     summary: Update an existing role
 *     description: This endpoint is used to update an existing role's allowed pages but not the name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the role.
 *                 example: "Manager"
 *               allowedPages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Packages", "UserManagement", "Rewards", "Dashboard", "Payments", "Uploads", "SubscriptionPlans", "CRBTAds"]
 *                 description: Updated list of pages the role is allowed to access.
 *                 example: ["Dashboard", "Payments", "Uploads"]
 *     responses:
 *       200:
 *         description: Role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role updated successfully."
 *       400:
 *         description: Bad request. Missing or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized. The client is not authorized to update roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to update roles."
 *       404:
 *         description: Not found. The role to be updated does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found."
 */
roleRouter.put("/", verifyJwt, isSuperAdminAccount, updateRoleController);

/**
 * @swagger
 * /api/v1/roles/all:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Retrieve all roles and their information
 *     description: This endpoint retrieves a list of all roles and their associated information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Unique identifier for the role.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Name of the role.
 *                     example: "UserManager"
 *                   allowedPages:
 *                     type: array
 *                     items:
 *                       type: string
 *                       enum: ["Packages", "UserManagement", "Rewards", "Dashboard", "Payments", "Uploads", "SubscriptionPlans", "CRBTAds"]
 *                     description: Pages the role is allowed to access.
 *                     example: ["Dashboard", "UserManagement"]
 *       401:
 *         description: Unauthorized. The client is not authorized to retrieve roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to retrieve roles."
 */
roleRouter.get("/all", verifyJwt, isSuperAdminAccount, getAllRolesController);

/**
 * @swagger
 * /api/v1/roles/role/{name}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Retrieve a specific role and its information
 *     description: This endpoint retrieves a specific role and its associated information based on the role name provided in the path.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: The name of the role to retrieve.
 *         schema:
 *           type: string
 *           example: "UserManager"
 *     responses:
 *       200:
 *         description: Successfully retrieved the role.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Unique identifier for the role.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of the role.
 *                   example: "UserManager"
 *                 allowedPages:
 *                   type: array
 *                   items:
 *                     type: string
 *                     enum: ["Packages", "UserManagement", "Rewards", "Dashboard", "Payments", "Uploads", "SubscriptionPlans", "CRBTAds"]
 *                   description: Pages the role is allowed to access.
 *                   example: ["Dashboard", "UserManagement"]
 *       401:
 *         description: Unauthorized. The client is not authorized to retrieve roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to retrieve the role."
 */
roleRouter.get("/role/:name", verifyJwt, isSuperAdminAccount, getRoleController);

/**
 * @swagger
 * /api/v1/roles/{name}:
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete a specific role and its information
 *     description: This endpoint deletes a specific role and all its associated information based on the role name provided in the path.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: The name of the role to delete.
 *         schema:
 *           type: string
 *           example: "UserManager"
 *     responses:
 *       204:
 *         description: Successfully deleted the role. No content is returned.
 *       401:
 *         description: Unauthorized. The client is not authorized to delete roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to delete the role."
 *       404:
 *         description: Not Found. The specified role does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found."
 */
roleRouter.delete("/:name", verifyJwt, isSuperAdminAccount, deleteRoleController);
