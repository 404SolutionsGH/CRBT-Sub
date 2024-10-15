import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { getPackageController, getPackagesController } from "../controllers/packageController";

export const packageRouter= Router()



packageRouter.get("/",getPackagesController)
packageRouter.get("/:id", getPackageController);