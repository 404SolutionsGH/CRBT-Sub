import { Model } from "sequelize";

export class UserContacts extends Model {
  declare id: number;
  declare ownerId: number;
  declare contacts: Array<string>;
}
