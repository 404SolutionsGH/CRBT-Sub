import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { SongRepository } from "../../domain/interfaces/songRepository";

export class SongRepoImpl implements SongRepository {
  async saveSong(songData: Song): Promise<Song | null> {
    const { id,ownerId, songTitle, albumName, artisteName, lang, ussdCode, price, category, tune, profile, subscriptionType } = songData;
    const [itemCreated, isCreated] = await Song.findOrCreate({
      where: { ownerId, songTitle, lang, subscriptionType },
      defaults: {
        id,
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
  async findSongById(id: number): Promise<Song | null> {
    return Song.findByPk(id);
  }
}