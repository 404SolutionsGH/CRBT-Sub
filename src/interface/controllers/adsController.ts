import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { addAds } from "../../useCases/admin/addAds";
import { Ads } from "../../domain/entities/Ads";
import { isStringContentNumber } from "../../@common/helperMethods/isStringNumber";
import { getAllAds } from "../../useCases/ads/getAllAds";
import { deleteAds } from "../../useCases/admin/deleteAds";
import { updateAds } from "../../useCases/admin/updateAds";

export const createAdsController = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, url, image, expiryDate } = req.body;
  await addAds(Ads.build({ title, description, url, image, expiryDate }));
  res.status(201).json({ message: `Ad with title ${title} has been created sucessfully` });
});

export const updateAdsController = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, url, image, expiryDate } = req.body;
  const { id } = req.params;
  isStringContentNumber(id, "id");
  await updateAds(Ads.build({ title, description, url, image, id: Number(id), expiryDate }));
  res.status(200).json({ message: `Ad updated sucessfully`});
});

export const getAllAdsController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await getAllAds());
});

export const deleteAdsController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  isStringContentNumber(id, "id");
  await deleteAds(Number(id));
  res.status(204).end();
});
