import { Ads } from "../../domain/entities/Ads";
import { AppError } from "../../domain/entities/AppError";
import { AdsRepoImpl } from "../../infrastructure/repository/adsRepoImplementation";

export const updateAds = async (adsData: Ads) => {
  const { update } = new AdsRepoImpl();
  const isUpdated = await update(adsData);
  if (!isUpdated) throw new AppError("Updation failed no such id exist", 404);
};
