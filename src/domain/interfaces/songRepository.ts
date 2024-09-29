import { Song } from "../entities/Song";




export interface SongRepository {
  saveSong(songData: Song): Promise<Song | null>;
  findSongById(id: number): Promise<Song | null>;
  findSongsByOwnersId(ownerId: number): Promise<Array<Song>>;
  getAllSongs(): Promise<Array<Song>>;
}