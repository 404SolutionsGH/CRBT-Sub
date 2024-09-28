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
  declare profile:string;
  declare subscriptionType: "weekily" | "monthly" | "daily";
  declare numberOfListeners: Array<number>;
  declare numberOfSubscribers: Array<number>;
}