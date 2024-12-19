import { User } from "../../../domain/entities/User";
import { DataTypes } from "sequelize";
import { sequelize } from "../connectDb";
import { UserContacts } from "../../../domain/entities/UserContacts";



export const defineUserContactsTable = () => {
  UserContacts.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      ownerId: {
        type: DataTypes.INTEGER(),
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "ownerId must contain a value" },
          isInt: { msg: "ownerId must be a integer value" },
        },
      },
      contacts: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    { sequelize: sequelize, tableName: "UsersContacts", timestamps: true}
  );
};