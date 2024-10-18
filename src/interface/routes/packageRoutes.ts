import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { getPackageCatController, getPackageCatsController, getPackageController, getPackagesController } from "../controllers/packageController";

export const packageRouter= Router()



packageRouter.get("/",getPackagesController)
packageRouter.get("/:id", getPackageController);
packageRouter.get("/category",getPackageCatsController)
packageRouter.get("/category/:id", getPackageCatController);