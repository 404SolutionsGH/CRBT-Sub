import { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { profileController, songFileController, uploadController } from "./songsControllers";
import { getFilesFromReq } from "../../libs/multer";
import { setImgAndMp3Files } from "../../middleware/setImg&Mp3Files";




export const songsRouter = Router();
songsRouter.post("/upload", getFilesFromReq(), verifyJwt, setImgAndMp3Files, uploadController);
songsRouter.get("/profile/:fileName", verifyJwt, profileController);
songsRouter.get("/song-file/:fileName",verifyJwt, songFileController);