import { Song } from "../entities/Song";




export interface SongRepository {
  saveSong(songData: Song): Promise<Song | null>;
  updateSongInfo(songData:Song):Promise<Song | null> ;
  findSongById(id: number): Promise<Song | null>;
  findSongsByOwnersId(ownerId: number): Promise<Array<Song>>;
  getAllSongs(): Promise<Array<Song>>;
  increaseNumberOfSubscribers(ammount: number, idd: number,flag:'dec'|null): Promise<void>;
  increaseNumberOfListeners(ammount: number, id: number, url: string | null ): Promise<void>;
}