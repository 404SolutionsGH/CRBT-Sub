import { Model } from "sequelize";



export class User extends Model {
  declare id: Number;
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare langPref: string;
  declare accountBalance: string;
  declare subService:Array<Number>
  declare unSubService:Array<Number>
}
