import { DataTypes } from "sequelize";
import { sequelize } from "../connectDb";
import { Transaction } from "../../../domain/entities/Transactions";

export const defineTransactionTable = () => {
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for email is request body" },
          notEmpty: { msg: "email value is an empty string" },
          isEmail: { msg: "{VALUE} is not a valid email" },
        },
      },
      planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "No data passed for planId in request body" },
          isInt: { msg: "Data passed planId must be an integer" },
        },
      },

      state: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
    },
    { sequelize: sequelize, tableName: "Transactions", timestamps: true }
  );
};
