import { Model } from "sequelize";


export class Admin extends Model {
  declare id: Number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password:string;
  declare adminType:"merchant"|"system"
}