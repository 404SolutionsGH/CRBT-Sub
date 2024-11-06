import { DataTypes } from "sequelize";
import { System } from "../../../domain/entities/System";
import { sequelize } from "../connectDb";

export const defineSystemTable = () => {
  System.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
        validate: {
          isIn: { msg: "Values passed for status is either Active or Maintaince", args: [["Active", "Maintaince"]] },
        },
      },
      chapaSecretKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize: sequelize, tableName: "System", timestamps: false }
  );
};
