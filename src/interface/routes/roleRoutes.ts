import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt";
import { isSuperAdminAccount } from "../middlewares/checkForSuperAdmin";
import { createRoleController, deleteRoleController, getAllRolesController, getRoleController, updateRoleController } from "../controllers/roleControllers";

export const roleRouter = Router();

roleRouter.post("/", verifyJwt, isSuperAdminAccount, createRoleController);

roleRouter.put("/", verifyJwt, isSuperAdminAccount, updateRoleController);

roleRouter.get("/all", verifyJwt, isSuperAdminAccount, getAllRolesController);

roleRouter.get("/role/:name", verifyJwt, isSuperAdminAccount, getRoleController);

roleRouter.delete("/:name", verifyJwt, isSuperAdminAccount, deleteRoleController);
