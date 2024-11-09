import { AppError } from "../../domain/entities/AppError";
import { AdsRepoImpl } from "../../infrastructure/repository/adsRepoImplementation";

export const deleteAds = async (adsId: number) => {
  const { deleteAd } = new AdsRepoImpl();
  const isDeleted = await deleteAd(adsId);
  if (!isDeleted) throw new AppError("Deletion failed no ad with such id exist", 404);
};
