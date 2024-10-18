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
import { addPackageCat } from "../../useCases/admin/addPackageCat";
import { PackageCategory } from "../../domain/entities/PackageCategory";
import { updatePackageCategory } from "../../useCases/admin/updatePackageCat";
import { deletePackageCategory } from "../../useCases/admin/deletePackageCat";

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
  const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId } = req.body;
  if (!packageName || !packageType || !packageValidity || !packageCatId)
    throw new AppError(
      !packageName
        ? "No value passed for packageName in body"
        : !packageType
        ? "No value passed for packageType in body"
        : !packageCatId
        ? "No value passed for packageCatId in body"
        : "No value passed for packageValidity",
      400
    );
  await addPackage(Package.build({ packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId }));
  res.status(201).json({ message: `The package ${packageName} has been created sucessfully` });
});

export const updatePackagesController = asyncHandler(async (req: Request, res: Response) => {
  const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId } = req.body;
  isStringContentNumber(req.params.id, "id");
  const id = Number(req.params.id);
  await updatePackage(Package.build({ id, packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId }));
  res.status(200).json({ message: `The package ${packageName} has been updated sucessfully` });
});

export const deletePackagesController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  isStringContentNumber(id, "id");
  await deletePackage(Number(id));
  res.status(200).json({ messge: "Package Deletion sucessfull" });
});

export const createPackageCategoriesController = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;
  await addPackageCat(PackageCategory.build({ title, description }));
  res.status(201).json({ message: `The package category ${title} has been created sucessfully` });
});

export const updatePackageCategoriesController = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;
  isStringContentNumber(req.params.id, "id");
  const id = Number(req.params.id);
  await updatePackageCategory(PackageCategory.build({ title, description, id }));
  res.status(200).json({ message: `The package category ${title} has been updated sucessfully` });
});

export const delePackageCategoriesController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  isStringContentNumber(id, "id");
  await deletePackageCategory(Number(id));
  res.status(200).json({ messge: "Package Category and it related package items has been deleted sucessfull" });
});
