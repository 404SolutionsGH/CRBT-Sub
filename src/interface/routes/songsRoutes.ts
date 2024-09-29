import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { getArrayOfFiles, getFilesFromReq } from "../../libs/multer";
import { setImgAndMp3Files } from "../middlewares/setImg&Mp3Files";
import { getAllSongsController, getUploadedSongsController, listenController, profileController, tempUploadController, uploadController } from "../controllers/songsControllers";
import { setupMp3FilesInReq } from "../middlewares/setMp3Files";
import { getFileFromSys } from "../middlewares/getFile";

export const songsRouter = Router();

songsRouter.post("/upload", getFilesFromReq(), verifyJwt, setImgAndMp3Files, uploadController);

songsRouter.post("/temp/upload",getArrayOfFiles(),verifyJwt,setupMp3FilesInReq,tempUploadController)

//endpoit for getting only songs an Admin has uploaded.
songsRouter.get("/:state",verifyJwt,getUploadedSongsController) 

// endpoint for super admin to get all songs
songsRouter.get("/",verifyJwt,getAllSongsController)




songsRouter.get("/profile/:fileName",getFileFromSys,profileController);
songsRouter.get("/listen/:fileName", getFileFromSys, listenController);
// songsRouter.get("/search", verifyJwt, searchController);
// songsRouter.get("/subscription-details", verifyJwt, songSubDetailController);
// songsRouter.get("/recommendation", verifyJwt, recommendationController);
// songsRouter.get("/tone/:id", verifyJwt, toneController);
// songsRouter.delete("/tone/:id", verifyJwt, toneDeletionController);
// songsRouter.get("/all", verifyJwt, allSongsController);
