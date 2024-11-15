import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";

export const roleRouter = Router();

roleRouter.post("/", verifyJwt, isSuperAdminAccount);

roleRouter.put("/", verifyJwt, isSuperAdminAccount);

roleRouter.get("/all", verifyJwt, isSuperAdminAccount);

roleRouter.get("/role/:name", verifyJwt, isSuperAdminAccount);

roleRouter.delete("/:name", verifyJwt, isSuperAdminAccount);
