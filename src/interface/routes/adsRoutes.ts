import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";
import { createAdsController, deleteAdsController, getAllAdsController, updateAdsController } from "../controllers/adsController";



export const adsRouter=Router()

/**
 * @swagger
 * /api/v1/ads:
 *   post:
 *     tags:
 *       - Ads
 *     summary: Set up ads for clients
 *     description: This endpoint allows admins to set up ads for clients. A valid authorization header with a JWT token is required.
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
 *                 description: The title of the ad.
 *                 example: "Special Offer"
 *               description:
 *                 type: string
 *                 description: The description of the ad.
 *                 example: "Get 20% off on all products!"
 *               url:
 *                 type: string
 *                 description: URL to which the ad should link.
 *                 example: "https://example.com/offer"
 *               image:
 *                 type: string
 *                 format: byte
 *                 description: Base64 string representing the ad image.
 *                 example: "iVBORw0KGgoAAAANSUhEUgAA..."
 *               expiryDate:
 *                 type: string
 *                 description: Expiry date of the ad in ISO 8601 format.
 *                 example: "2024-12-31"
 *     responses:
 *       201:
 *         description: Ad created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ad with title Special Offer has been created successfully"
 *       400:
 *         description: Bad request. Missing or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized. The client is not authorized to create an ad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to create an ad."
 */
adsRouter.post("/",verifyJwt,isSuperAdminAccount,createAdsController)


/**
 * @swagger
 * /api/v1/ads/{id}:
 *   put:
 *     tags:
 *       - Ads
 *     summary: Update an ad for clients
 *     description: This endpoint allows admins to update existing ads for clients. A valid authorization header with a JWT token is required.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ad to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the ad.
 *                 example: "Special Offer"
 *               description:
 *                 type: string
 *                 description: The description of the ad.
 *                 example: "Updated offer details."
 *               url:
 *                 type: string
 *                 description: URL to which the ad should link.
 *                 example: "https://example.com/new-offer"
 *               image:
 *                 type: string
 *                 format: byte
 *                 description: Base64 string representing the updated ad image.
 *                 example: "iVBORw0KGgoAAAANSUhEUgAA..."
 *               expiryDate:
 *                 type: string
 *                 description: Expiry date of the ad in ISO 8601 format.
 *                 example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Ad updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ad updated successfully"
 *       400:
 *         description: Bad request. Missing or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized. The client is not authorized to update the ad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to update ad."
 */
adsRouter.put("/:id",verifyJwt,isSuperAdminAccount,updateAdsController)

/**
 * @swagger
 * /api/v1/ads/all:
 *   get:
 *     tags:
 *       - Ads
 *     summary: Retrieve all ads
 *     description: This endpoint allows users to fetch all active ads in the system.
 *     responses:
 *       200:
 *         description: A list of all ads.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the ad.
 *                     example: "12345"
 *                   title:
 *                     type: string
 *                     description: The title of the ad.
 *                     example: "Limited Time Offer"
 *                   description:
 *                     type: string
 *                     description: Description of the ad.
 *                     example: "Get 20% off on all items."
 *                   url:
 *                     type: string
 *                     description: URL linked to the ad.
 *                     example: "https://example.com/offer"
 *                   image:
 *                     type: string
 *                     format: byte
 *                     description: Base64 string of the ad image.
 *                     example: "iVBORw0KGgoAAAANSUhEUgAA..."
 *                   expiryDate:
 *                     type: string
 *                     description: Expiry date of the ad in ISO 8601 format.
 *                     example: "2024-12-31"
 */
adsRouter.get("/all",getAllAdsController)


/**
 * @swagger
 * /api/v1/ads/{id}:
 *   delete:
 *     tags:
 *       - Ads
 *     summary: Delete an ad
 *     description: This endpoint allows an admin to delete a specific ad by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the ad to delete.
 *     responses:
 *       204:
 *         description: Ad deleted successfully. No content in the response body.
 *       400:
 *         description: Bad request. The provided ad ID is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ad ID."
 *       401:
 *         description: Unauthorized. Client is not authorized to delete the ad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to delete ad."
 */
adsRouter.delete("/:id", verifyJwt, isSuperAdminAccount, deleteAdsController);