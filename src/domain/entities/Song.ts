import { Model } from "sequelize";



export class Song extends Model {
  declare id: number;
  declare ownerId: number;
  declare songTitle: string;
  declare artisteName: string;
  declare albumName: string;
  declare ussdCode: string;
  declare price: string;
  declare category: string;
  declare tune: string;
  declare lang: string;
  declare profile: string;
  declare subscriptionType: "weekly" | "monthly" | "by_weekly";
  declare numberOfListeners: number;
  declare numberOfSubscribers: number;
  declare deleteFlag:boolean;
}


export interface SongI {
  id: number;
  ownerId: number;
  songTitle: string;
  artisteName: string;
  albumName: string;
  ussdCode: string;
  price: string;
  category: string;
  tune: string;
  lang: string;
  profile: string;
  subscriptionType: "weekly" | "monthly" | "by_weekly";
}