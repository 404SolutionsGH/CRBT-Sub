"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageRouter = void 0;
const express_1 = require("express");
const packageController_1 = require("../controllers/packageController");
exports.packageRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/package/all:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Get all packages
 *     description: This is the endpoint for retrieving all packages in the system. No authentication header is required.
 *     responses:
 *       200:
 *         description: A list of all packages in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the package.
 *                   packageName:
 *                     type: string
 *                     description: The name of the package.
 *                   packageDescription:
 *                     type: string
 *                     description: A brief description of the package.
 *                   packageImg:
 *                     type: string
 *                     nullable: true
 *                     description: A Base64 string representing the package image.
 *                   packageType:
 *                     type: string
 *                     enum: [any, voice, sms, data]
 *                     description: The type of package.
 *                   ussdCode:
 *                     type: string
 *                     description: The USSD code associated with the package.
 *                   packageValidity:
 *                     type: string
 *                     description: The validity period of the package (e.g., 1D for 1 day, 2W for 2 weeks, 3M for 3 months, 0I for non-expiry).
 *                   packageCatId:
 *                     type: number
 *                     description: The ID of the package category to which this package belongs.
 *               example:
 *                 - id: 1
 *                   packageName: "Data Pack 1GB"
 *                   packageDescription: "1GB data package valid for 7 days"
 *                   packageImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
 *                   packageType: "data"
 *                   ussdCode: "*123*1#"
 *                   packageValidity: "7D"
 *                   packageCatId: 2
 *                 - id: 2
 *                   packageName: "Voice Pack 100 Minutes"
 *                   packageDescription: "100 minutes voice package valid for 1 month"
 *                   packageImg: null
 *                   packageType: "voice"
 *                   ussdCode: "*123*2#"
 *                   packageValidity: "1M"
 *                   packageCatId: 1
 */
exports.packageRouter.get("/all", packageController_1.getPackagesController);
/**
 * @swagger
 * /api/v1/package/{id}:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Get a package by ID
 *     description: This is the endpoint for retrieving a package by its ID in the system. Requires a valid package ID in the URL path.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package to retrieve (must be a valid package ID).
 *     responses:
 *       200:
 *         description: A package in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the package.
 *                 packageName:
 *                   type: string
 *                   description: The name of the package.
 *                 packageDescription:
 *                   type: string
 *                   description: A brief description of the package.
 *                 packageImg:
 *                   type: string
 *                   nullable: true
 *                   description: A Base64 string representing the package image.
 *                 packageType:
 *                   type: string
 *                   enum: [any, voice, sms, data]
 *                   description: The type of package.
 *                 ussdCode:
 *                   type: string
 *                   description: The USSD code associated with the package.
 *                 packageValidity:
 *                   type: string
 *                   description: The validity period of the package (e.g., 1D for 1 day, 2W for 2 weeks, 3M for 3 months, 0I for non-expiry).
 *                 packageCatId:
 *                   type: number
 *                   description: The ID of the package category to which this package belongs.
 *               example:
 *                 id: 1
 *                 packageName: "Data Pack 1GB"
 *                 packageDescription: "1GB data package valid for 7 days"
 *                 packageImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
 *                 packageType: "data"
 *                 ussdCode: "*123*1#"
 *                 packageValidity: "7D"
 *                 packageCatId: 2
 *       400:
 *         description: Bad request. Invalid package ID or other errors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid package ID.
 *       404:
 *         description: Package not found. The package with the provided ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No package found with the provided ID.
 */
exports.packageRouter.get("/:id", packageController_1.getPackageController);
/**
 * @swagger
 * /api/v1/package/all/category:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Get all package categories
 *     description: This is the endpoint for retrieving all package categories in the system. No authentication header is required.
 *     responses:
 *       200:
 *         description: A list of all package categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the package category.
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The title of the package category.
 *                     example: "Data Packages"
 *                   description:
 *                     type: string
 *                     description: A brief description of the package category.
 *                     example: "Packages offering various data bundles."
 */
exports.packageRouter.get("/all/category", packageController_1.getPackageCatsController);
/**
 * @swagger
 * /api/v1/package/category/{id}:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Get a package category by ID
 *     description: This is the endpoint for retrieving a package category using its ID in the system. Requires a valid package category ID in the URL path.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package category to retrieve.
 *     responses:
 *       200:
 *         description: The package category details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the package category.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The title of the package category.
 *                   example: "Voice Packages"
 *                 description:
 *                   type: string
 *                   description: A brief description of the package category.
 *                   example: "Packages offering various voice call bundles."
 *       400:
 *         description: Bad request. Invalid ID provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters.
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
exports.packageRouter.get("/category/:id", packageController_1.getPackageCatController);
