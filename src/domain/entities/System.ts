import { Model } from "sequelize";

export class System extends Model {
  declare id: number;
  declare adminId: number;
  declare status: "Active" | "Maintainance";
  declare chapaSecretKey: string;
  declare pointSettings:object;
}
