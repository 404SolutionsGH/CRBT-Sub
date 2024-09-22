import { Router } from "express";

// import { accountInfoController, accountUpdateController } from "../controllers/userControllers";
import { verifyJwt } from "../middlewares/verifyJwt";
import { accountInfoController, accountUpdateController } from "../controllers/userControllers";

export const userRouter = Router();
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
 *                   example: "1000.00"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 langPref:
 *                   type: string
 *                   example: "eng"
 *                 subService:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["service1", "service2"]
 *                 unSubService:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["service3", "service4"]
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
