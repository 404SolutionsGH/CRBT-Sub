import { TempSong } from "../../domain/entities/TempSong";
import { TempSongRepository } from "../../domain/interfaces/tempSongRepository";

export class TempSongRepoImpl implements TempSongRepository {
  async createTempSongs(songsData: Array<TempSong>): Promise<void> {
    songsData.forEach(async (items) => {
      const { tune, ownerId,originalName } = items;
      // console.log(`tune=${items.tune},ownerId=${items.ownerId}`)
      await TempSong.create({ tune, ownerId,originalName });
    });
  }
  async findTempSongsById(ownerId: number): Promise<Array<TempSong>> {
    return await TempSong.findAll({ where: { ownerId } });
  }
  async findTempSongById(songId: number): Promise<TempSong | null> {
    return await TempSong.findByPk(songId);
  }
}
