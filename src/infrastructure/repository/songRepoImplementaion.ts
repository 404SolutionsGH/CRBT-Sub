import { Op } from "sequelize";
import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { SongRepository } from "../../domain/interfaces/songRepository";

export class SongRepoImpl implements SongRepository {
  async saveSong(songData: Song): Promise<Song | null> {
    const { ownerId, songTitle, albumName, artisteName, lang, ussdCode, price, category, tune, profile, subscriptionType } = songData;
    const [itemCreated, isCreated] = await Song.findOrCreate({
      where: { ownerId, songTitle, lang, subscriptionType },
      defaults: {
        ownerId,
        songTitle,
        albumName,
        artisteName,
        lang,
        ussdCode,
        price,
        category,
        tune,
        profile,
        subscriptionType,
      },
    });
    if (isCreated) return itemCreated;

    throw new AppError("This song has already been uploaded", 409);
  }

  async updateSongInfo(songData: Song): Promise<Song | null> {
    const { id, ownerId, songTitle, albumName, artisteName, lang, ussdCode, price, category, subscriptionType } = songData;

    const updatedSongInfo = await Song.update({ songTitle, albumName, artisteName, lang, ussdCode, price, category, subscriptionType }, { where: { id, ownerId }, returning: true });
    if (updatedSongInfo[0] === 1) return updatedSongInfo[1][0];
    return null;
  }

  async findSongById(id: number): Promise<Song | null> {
    return await Song.findByPk(id, { attributes: { exclude: ["ownerId", "updatedAt"] } });
  }

  async findSongsByOwnersId(ownerId: number): Promise<Array<Song>> {
    return await Song.findAll({ where: { ownerId } });
  }

  async getAllSongs(): Promise<Array<Song>> {
    return await Song.findAll({ attributes: { exclude: ["ownerId", "updatedAt"] } });
  }

  async increaseNumberOfSubscribers(ammount: number, id: number, flag: "dec" | null = null): Promise<void> {
    if (flag) await Song.decrement("numberOfSubscribers", { by: ammount, where: { id } });
    else await Song.increment("numberOfSubscribers", { by: ammount, where: { id } });
  }
  async increaseNumberOfListeners(amount: number, id: number, url: string | null = null): Promise<void> {
    // console.log(`Song url=${url}`);
    if (id === 0 && url) await Song.increment("numberOfListeners", { by: amount, where: { tune: { [Op.like]: `%${url}` } } });
    else await Song.increment("numberOfListeners", { by: amount, where: { id } });
  }
}
