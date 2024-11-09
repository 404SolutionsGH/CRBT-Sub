import { Ads } from "../../domain/entities/Ads";
import { AdsRepository } from "../../domain/interfaces/adsRepository";

export class AdsRepoImpl implements AdsRepository {
  async create(adsData: Ads): Promise<Ads> {
    const { image, url, title, description, expiryDate } = adsData;
    return await Ads.create({ image, url, title, description, expiryDate });
  }
  async getAll(): Promise<Ads[]> {
    return await Ads.findAll();
  }
  async update(adsData: Ads): Promise<boolean> {
    const { image, url, id, title, description ,expiryDate} = adsData;
    const [numberOfUpdated] = await Ads.update({ image, url, title, description, expiryDate }, { where: { id } });

    if (numberOfUpdated === 1) return true;
    return false;
  }
  async deleteAd(adsId: number): Promise<boolean> {
    const numberOfDeleted = await Ads.destroy({ where: { id: adsId } });
    if (numberOfDeleted === 1) return true;
    return false;
  }
}
