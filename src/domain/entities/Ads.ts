import { Model } from "sequelize";

export class Ads extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare image: string;
  declare url: string;
  declare expiryDate:string;
}
