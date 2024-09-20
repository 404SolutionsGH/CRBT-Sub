import { Model } from "sequelize";



export class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare langPref: string;
  declare accountBalance: string;
  declare subService:Array<number>
  declare unSubService:Array<number>
}
