import { Model } from "sequelize";



export class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare email:string;
  declare langPref: string;
  declare accountBalance: string;
  declare profile?:string;
  declare location?:string;
  declare subSongId: number;
  declare createdAt: string;
}
