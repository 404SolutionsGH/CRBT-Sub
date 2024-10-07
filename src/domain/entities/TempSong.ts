import { Model } from "sequelize";

export class TempSong extends Model {
  declare id: number;
  declare ownerId: number;
  declare tune:string;
  declare originalName:string;
}

export interface TempSongI {
  ownerId: number;
  tune: string;
}
