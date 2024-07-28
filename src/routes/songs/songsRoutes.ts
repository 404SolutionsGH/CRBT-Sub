import { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { uploadController } from "./songsControllers";
import { getFilesFromReq } from "../../libs/multer";
import { setImgAndMp3Files } from "../../middleware/setImg&Mp3Files";




export const songsRouter = Router();
songsRouter.post("/upload", verifyJwt,getFilesFromReq(),setImgAndMp3Files,uploadController);