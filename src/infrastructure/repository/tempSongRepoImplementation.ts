import { Op } from "sequelize";
import { TempSong } from "../../domain/entities/TempSong";
import { TempSongRepository } from "../../domain/interfaces/tempSongRepository";

export class TempSongRepoImpl implements TempSongRepository {
  async createTempSongs(songsData: Array<TempSong>): Promise<void> {
    songsData.forEach(async (items) => {
      const { tune, ownerId, originalName } = items;
      // console.log(`tune=${items.tune},ownerId=${items.ownerId}`)
      await TempSong.create({ tune, ownerId, originalName });
    });
  }
  async findTempSongsById(ownerId: number): Promise<Array<TempSong>> {
    return await TempSong.findAll({ where: { ownerId } });
  }
  async findTempSongById(songId: number): Promise<TempSong | null> {
    return await TempSong.findByPk(songId);
  }

  async findByTuneAndDelete(tune: string): Promise<void> {
    await TempSong.destroy({ where: { tune: { [Op.like]: `%${tune}%` } } });
  }
  async deleteSong(songId: number): Promise<boolean> {
    const numOfSongsDeleted = await TempSong.destroy({ where: { id: songId } });
    if (numOfSongsDeleted === 1) return true;
    return false;
  }
}
