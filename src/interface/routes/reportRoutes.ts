import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { createReportController, deleteReportController, getReportController, getReportsController, updateReportController } from "../controllers/reportController";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";

export const reportsRouter = Router();

/**
 * @swagger
 * /api/v1/reports:
 *   post:
 *     tags:
 *       - Reports
 *     summary: Endpoint for submitting a report
 *     description: This endpoint allows users to submit a report with a title, description, and category.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Bug Report"
 *               description:
 *                 type: string
 *                 example: "There is an issue with the login feature."
 *               category:
 *                 type: string
 *                 example: "Bug"
 *     responses:
 *       201:
 *         description: Report submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report submitted successfully."
 *       400:
 *         description: Bad request. The request body is not in the correct format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request body. Please provide 'title', 'description', and 'category' as strings."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while submitting the report."
 */
reportsRouter.post("/", verifyJwt, createReportController);
// reportsRouter.put("/:id", verifyJwt, updateReportController);


/**
 * @swagger
 * /api/v1/reports/all:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Endpoint for getting all submitted reports (only for superAdmin)
 *     description: This endpoint allows superAdmins to retrieve all submitted reports.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all reports.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Bug Report"
 *                   description:
 *                     type: string
 *                     example: "There is an issue with the login feature."
 *                   category:
 *                     type: string
 *                     example: "Bug"
 *       402:
 *         description: Authorization failed or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access. Only superAdmin can access this endpoint."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving the reports."
 */
reportsRouter.get("/all", verifyJwt, isSuperAdminAccount,getReportsController);


/**
 * @swagger
 * /api/v1/reports/{reportId}:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Endpoint for getting a specific report
 *     description: This endpoint allows users to retrieve a specific report by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the report to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Bug Report"
 *                 description:
 *                   type: string
 *                   example: "There is an issue with the login feature."
 *                 category:
 *                   type: string
 *                   example: "Bug"
 *       404:
 *         description: Report not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Report not found."
 *       402:
 *         description: Authorization failed or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving the report."
 */
reportsRouter.get("/:reportId", verifyJwt, getReportController);

/**
 * @swagger
 * /api/v1/reports/{reportId}:
 *   delete:
 *     tags:
 *       - Reports
 *     summary: Endpoint for deleting a specific report
 *     description: This endpoint allows SuperAdmins to delete a specific report by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the report to delete
 *     responses:
 *       204:
 *         description: Report deleted successfully.
 *       404:
 *         description: Report not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Report not found."
 *       402:
 *         description: Authorization failed or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while deleting the report."
 */
reportsRouter.delete("/:reportId", verifyJwt, deleteReportController);
