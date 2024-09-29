"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songsRouter = void 0;
const express_1 = require("express");
const verifyJwt_1 = require("../middlewares/verifyJwt");
const multer_1 = require("../../libs/multer");
const setImg_Mp3Files_1 = require("../middlewares/setImg&Mp3Files");
const songsControllers_1 = require("../controllers/songsControllers");
const setMp3Files_1 = require("../middlewares/setMp3Files");
const getFile_1 = require("../middlewares/getFile");
exports.songsRouter = (0, express_1.Router)();
exports.songsRouter.post("/upload", (0, multer_1.getFilesFromReq)(), verifyJwt_1.verifyJwt, setImg_Mp3Files_1.setImgAndMp3Files, songsControllers_1.uploadController);
exports.songsRouter.post("/temp/upload", (0, multer_1.getArrayOfFiles)(), verifyJwt_1.verifyJwt, setMp3Files_1.setupMp3FilesInReq, songsControllers_1.tempUploadController);
//endpoit for getting only songs an Admin has uploaded.
exports.songsRouter.get("/:state", verifyJwt_1.verifyJwt, songsControllers_1.getUploadedSongsController);
// endpoint for super admin to get all songs
exports.songsRouter.get("/", verifyJwt_1.verifyJwt, songsControllers_1.getAllSongsController);
exports.songsRouter.get("/profile/:fileName", getFile_1.getFileFromSys, songsControllers_1.profileController);
exports.songsRouter.get("/listen/:fileName", getFile_1.getFileFromSys, songsControllers_1.listenController);
// songsRouter.get("/search", verifyJwt, searchController);
// songsRouter.get("/subscription-details", verifyJwt, songSubDetailController);
// songsRouter.get("/recommendation", verifyJwt, recommendationController);
// songsRouter.get("/tone/:id", verifyJwt, toneController);
// songsRouter.delete("/tone/:id", verifyJwt, toneDeletionController);
// songsRouter.get("/all", verifyJwt, allSongsController);
