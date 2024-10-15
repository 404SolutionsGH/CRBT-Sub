import { Model } from "sequelize";


export class Package extends Model {
  declare id: number;
  declare packageName:string;
  declare packageDescription:string;
  declare ussdCode:string;
  declare price:string;
  declare packageType:"voice"|"data"|"sms"|"any";
  declare packageValidity:string;
  declare packageCatId:number
  declare packageImg:string;
}