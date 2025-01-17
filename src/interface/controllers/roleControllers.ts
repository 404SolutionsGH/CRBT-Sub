import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { RoleUseCases } from "../../useCases/admin/role";
import { Role } from "../../domain/entities/Role";
import { AppError } from "../../domain/entities/AppError";

const roleUsesCaes = new RoleUseCases();

export const createRoleController = asyncHandler(async (req: Request, res: Response) => {
  const { name, allowedPages } = req.body;
  if (!Array.isArray(allowedPages)) {
    throw new AppError("Value for allowedPages must be an array", 400);
  }
  await roleUsesCaes.createRole(Role.build({ name, allowedPages }));
  res.status(201).json({ message: `The Role: ${name} has been created sucessfully` });
});

export const updateRoleController = asyncHandler(async (req: Request, res: Response) => {
  const { name, allowedPages } = req.body;
  if (!Array.isArray(allowedPages)) {
    throw new AppError("Value for allowedPages must be an array", 400);
  }
  await roleUsesCaes.updateRole(Role.build({ name, allowedPages }));
  res.status(200).json({ message: `The Role: ${name} has been updated sucessfully` });
});

export const getRoleController = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.params;
  res.status(200).json({ role: await roleUsesCaes.getRole(name) });
});

export const getAllRolesController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await roleUsesCaes.getAllRoles());
});

export const deleteRoleController = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.params;
  await roleUsesCaes.deleteRole(name);
  res.status(204).end();
});
