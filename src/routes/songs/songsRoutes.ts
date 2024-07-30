import { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { listenController, profileController, searchController, uploadController } from "./songsControllers";
import { getFilesFromReq } from "../../libs/multer";
import { setImgAndMp3Files } from "../../middleware/setImg&Mp3Files";

export const songsRouter = Router();
songsRouter.post("/upload", getFilesFromReq(), verifyJwt, setImgAndMp3Files, uploadController);
songsRouter.get("/profile/:fileName", verifyJwt, profileController);
songsRouter.get("/listen/:fileName", verifyJwt, listenController);
songsRouter.get("/search", verifyJwt,searchController);

