import { Ads } from "../../domain/entities/Ads";
import { AdsRepoImpl } from "../../infrastructure/repository/adsRepoImplementation";

export const addAds = async (adsData: Ads) => {
const {create}= new AdsRepoImpl()
await create(adsData)
};
