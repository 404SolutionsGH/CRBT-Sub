import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { allPackages, getPackage } from "../../useCases/packages/getPackages";
import { isStringContentNumber } from "../../@common/helperMethods/isStringNumber";
import { allPackageCategories, getPackageCategory } from "../../useCases/packages/getPackageCategories";

export const getPackagesController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await allPackages());
});

export const getPackageController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  isStringContentNumber(id, "id");
  res.status(200).json(await getPackage(Number(id)));
});

export const getPackageCatsController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await allPackageCategories());
});

export const getPackageCatController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  isStringContentNumber(id, "id");
  res.status(200).json(await getPackageCategory(Number(id)));
});
