import { Model } from "sequelize";


export class Admin extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare adminType: "merchant" | "system";
  declare planId: number;
  declare role?:string
  declare nextSubPayment: string;
  declare createdAt:string;
}