import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { getArrayOfFiles, getFilesFromReq } from "../../libs/multer";
import { setImgAndMp3Files } from "../middlewares/setImg&Mp3Files";
import { getAllSongsController, getUploadedSongsController, listenController, profileController, tempUploadController, uploadController } from "../controllers/songsControllers";
import { setupMp3FilesInReq } from "../middlewares/setMp3Files";
import { getFileFromSys } from "../middlewares/getFile";

export const songsRouter = Router();

/**
 * @swagger
 * /api/v1/songs/upload:
 *   post:
 *     tags:
 *       - Songs
 *     summary: Upload a new song and save its meta data
 *     description: This endpoint allows merchants to upload songs and save the song metadata. A valid authorization header with a JWT token is required.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               songTitle:
 *                 type: string
 *                 description: Title of the song being uploaded.
 *                 example: "My New Song"
 *               artisteName:
 *                 type: string
 *                 description: Name of the artiste.
 *                 example: "John Doe"
 *               song:
 *                 type: string
 *                 format: binary
 *                 description: The song file (optional if tune is provided).
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: Profile image of the artiste.
 *               subscriptionType:
 *                 type: string
 *                 enum: ["weekly", "monthly", "by_weekly"]
 *                 description: The subscription type.
 *                 example: "monthly"
 *               ussdCode:
 *                 type: string
 *                 description: USSD code associated with the song.
 *                 example: "*123#"
 *               price:
 *                 type: string
 *                 description: Price of the song.
 *                 example: "5.00"
 *               category:
 *                 type: string
 *                 description: Category of the song.
 *                 example: "Hip-hop"
 *               albumName:
 *                 type: string
 *                 description: The name of the album.
 *                 example: "Best Hits"
 *               lang:
 *                 type: string
 *                 description: Language of the song.
 *                 example: "English"
 *               tune:
 *                 type: string
 *                 description: The tune ID, used only if no song file is provided.
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Song uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Song uploaded successfully"
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
 *         description: Unauthorized. The merchant is not authorized to upload songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to upload songs."
 *       404:
 *         description: Not found. The merchant trying to access this endpoint does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Merchant account not found."
 *       409:
 *         description: Conflict. The song has already been uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Song has already been uploaded."
 */
songsRouter.post("/upload", getFilesFromReq(), verifyJwt, setImgAndMp3Files, uploadController);




/**
 * @swagger
 * /api/v1/songs/temp/upload:
 *   post:
 *     tags:
 *       - Songs
 *     summary: Upload multiple songs at once
 *     description: This endpoint allows merchants to upload multiple songs in one request. The number of songs that can be uploaded depends on the merchant's subscription plan.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               song:
 *                 type: string
 *                 format: binary
 *                 description: Song file(s) to be uploaded. Multiple files are allowed.
 *     responses:
 *       201:
 *         description: All songs uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All 5 songs have been uploaded successfully"
 *       400:
 *         description: Bad request. Missing or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid file input."
 *       401:
 *         description: Unauthorized. The merchant is not authorized to upload songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to upload songs."
 *       404:
 *         description: Not found. The merchant trying to access this endpoint does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Merchant account not found."
 */
songsRouter.post("/temp/upload",getArrayOfFiles(),verifyJwt,setupMp3FilesInReq,tempUploadController)



/**
 * @swagger
 * /api/v1/songs/{state}:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Retrieve all songs uploaded by a merchant
 *     description: This endpoint allows merchants to retrieve all the songs they have uploaded. The state can be either "saved" for songs with complete metadata or "temp" for songs uploaded without metadata.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         description: Indicates the state of the songs to be retrieved. Either "saved" for songs with metadata or "temp" for songs without metadata.
 *         schema:
 *           type: string
 *           enum: [saved, temp]
 *           example: saved
 *     responses:
 *       200:
 *         description: A list of uploaded songs with metadata and links to the actual songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 songs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       ownerId:
 *                         type: integer
 *                         example: 7
 *                       songTitle:
 *                         type: string
 *                         example: "Mad over you"
 *                       artisteName:
 *                         type: string
 *                         example: "Me"
 *                       albumName:
 *                         type: string
 *                         example: "Rema Afro Mix"
 *                       ussdCode:
 *                         type: string
 *                         example: "*1237*3#"
 *                       price:
 *                         type: string
 *                         example: "7.45"
 *                       category:
 *                         type: string
 *                         example: "entertainment"
 *                       tune:
 *                         type: string
 *                         example: "https://crbtbackend.trotro.live/api/v1/songs/listen/lIJlLoQ7YquNbygMoZ8W.mp3"
 *                       lang:
 *                         type: string
 *                         example: "English"
 *                       profile:
 *                         type: string
 *                         example: "https://crbtbackend.trotro.live/api/v1/songs/profile/T8dpQGdY7AXwzz4f4UbL.jpeg"
 *                       subscriptionType:
 *                         type: string
 *                         example: "weekly"
 *                       numberOfSubscribers:
 *                         type: integer
 *                         nullable: true
 *                       numberOfListeners:
 *                         type: integer
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-02T17:07:04.045Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-02T17:07:04.045Z"
 *       400:
 *         description: Bad request. The request was malformed or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid state parameter."
 *       401:
 *         description: Unauthorized. The merchant is not authorized to view the songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized to access the songs."
 *       404:
 *         description: Not found. The merchant or songs do not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Merchant account not found."
 */
//endpoint for getting only songs an Admin has uploaded.
songsRouter.get("/:state",verifyJwt,getUploadedSongsController) 





/**
 * @swagger
 * /api/v1/songs:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Retrieve all songs in the system
 *     description: This endpoint retrieves a list of all songs that have been uploaded in the system, along with their metadata and links to the actual songs.
 *     responses:
 *       200:
 *         description: A list of all uploaded songs with metadata and links to the actual songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 songs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       songTitle:
 *                         type: string
 *                         example: "Mad over you"
 *                       artisteName:
 *                         type: string
 *                         example: "Me"
 *                       albumName:
 *                         type: string
 *                         example: "Rema Afro Mix"
 *                       ussdCode:
 *                         type: string
 *                         example: "*1237*3#"
 *                       price:
 *                         type: string
 *                         example: "7.45"
 *                       category:
 *                         type: string
 *                         example: "entertainment"
 *                       tune:
 *                         type: string
 *                         example: "https://crbtbackend.trotro.live/api/v1/songs/listen/lIJlLoQ7YquNbygMoZ8W.mp3"
 *                       lang:
 *                         type: string
 *                         example: "English"
 *                       profile:
 *                         type: string
 *                         example: "https://crbtbackend.trotro.live/api/v1/songs/profile/T8dpQGdY7AXwzz4f4UbL.jpeg"
 *                       subscriptionType:
 *                         type: string
 *                         example: "weekly"
 *                       numberOfSubscribers:
 *                         type: integer
 *                         nullable: true
 *                       numberOfListeners:
 *                         type: integer
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-02T17:07:04.045Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-02T17:07:04.045Z"
 */
// endpoint for getting all songs to get all songs
songsRouter.get("/",getAllSongsController)



songsRouter.get("/profile/:fileName",getFileFromSys,profileController);
songsRouter.get("/listen/:fileName", getFileFromSys, listenController);
// songsRouter.get("/search", verifyJwt, searchController);
// songsRouter.get("/subscription-details", verifyJwt, songSubDetailController);
// songsRouter.get("/recommendation", verifyJwt, recommendationController);
// songsRouter.get("/tone/:id", verifyJwt, toneController);
// songsRouter.delete("/tone/:id", verifyJwt, toneDeletionController);
// songsRouter.get("/all", verifyJwt, allSongsController);
