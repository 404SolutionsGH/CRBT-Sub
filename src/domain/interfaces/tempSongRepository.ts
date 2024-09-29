import { TempSong } from "../entities/TempSong";

export interface TempSongRepository {
  createTempSongs(songsData: Array<TempSong>): Promise<void>;
  findTempSongsById(ownerId: number): Promise<Array<TempSong>>;
  findTempSongById(songId: number): Promise<TempSong | null>;
}
