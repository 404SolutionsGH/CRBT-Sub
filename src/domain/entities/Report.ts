import { Model } from "sequelize";


export class Report extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare category: string;
}
