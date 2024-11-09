import { Ads } from "../entities/Ads";

export interface AdsRepository {
  create(adsData: Ads): Promise<Ads>;
  getAll(): Promise<Ads[]>;
  update(adsData: Ads): Promise<boolean>;
  deleteAd(adsId: number): Promise<boolean>;
}
