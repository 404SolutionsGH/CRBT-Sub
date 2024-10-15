import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";
import { getAllUsers, getSubUsers } from "../../useCases/admin/getUsers";
import { getAllMerch, getSubMerch } from "../../useCases/admin/getMerchants";
import { addPackage } from "../../useCases/admin/addPackage";
import { Package } from "../../domain/entities/Package";
import { updatePackage } from "../../useCases/admin/updatePackage";
import { isStringContentNumber } from "../../@common/helperMethods/isStringNumber";
import { deletePackage } from "../../useCases/admin/deletePackage";

export const getUsersController = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const { id } = req.body;
  let users: any;
  if (type === "all") {
    users = await getAllUsers();
  } else if (type === "sub" || type === "unSub") {
    users = await getSubUsers(id, type);
  } else throw new AppError("Invalid value passed for type url parameter value should be either all or sub", 400);
  res.status(200).json(users);
});

export const getMerchantsController = asyncHandler(async (req: Request, res: Response) => {
  const { cat } = req.params;
  let merchants: any;
  if (cat === "all") {
    merchants = await getAllMerch();
  } else if (cat === "sub" || cat === "unSub") {
    merchants = await getSubMerch(cat);
  } else throw new AppError("Invalid value passed for cat url parameter value should be either all or sub", 400);
  res.status(200).json(merchants);
});

export const createPackagesController = asyncHandler(async (req: Request, res: Response) => {
  const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity } = req.body;
  if (!packageName || !packageType || !packageValidity)
    throw new AppError(!packageName ? "No value passed for packageName in body" : !packageType ? "No value passed for packageType in body" : "No value passed for packageValidity", 400);
  await addPackage(Package.build({ packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity }));
  res.status(201).json({ message: `The package ${packageName} has been created sucessfully` });
});

export const updatePackagesController = asyncHandler(async (req: Request, res: Response) => {
  const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity } = req.body;
  isStringContentNumber(req.params.id, "id");
  const id = Number(req.params.id);
  await updatePackage(Package.build({ id, packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity }));
  res.status(200).json({ message: `The package ${packageName} has been updated sucessfully` });
});

export const deletePackagesController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  isStringContentNumber(id, "id");
  await deletePackage(Number(id));
  res.status(200).json({ messge: "Package Deletion sucessfull" });
});
