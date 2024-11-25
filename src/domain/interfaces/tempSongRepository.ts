import { TempSong } from "../entities/TempSong";

export interface TempSongRepository {
  createTempSongs(songsData: Array<TempSong>): Promise<void>;
  findTempSongsByOwnersId(ownerId: number, isSuperAdmin: false): Promise<Array<TempSong>>;
  findTempSongById(songId: number): Promise<TempSong | null>;
  findByTuneAndDelete(tune: string): Promise<void>;
  deleteSong(songId: number): Promise<boolean>;
}
