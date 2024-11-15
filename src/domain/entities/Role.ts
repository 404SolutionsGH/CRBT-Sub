import { Model } from "sequelize";


export class Role extends Model {
  declare id: number;
  declare name:string;
  declare allowedPages:string[];
}